import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DrugInteractionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Tables
    const drugsTable = new dynamodb.Table(this, 'DrugsTable', {
      tableName: 'drug-interaction-drugs',
      partitionKey: { name: 'drugId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Global Secondary Indexes for drug search
    drugsTable.addGlobalSecondaryIndex({
      indexName: 'GenericNameIndex',
      partitionKey: { name: 'genericName', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    drugsTable.addGlobalSecondaryIndex({
      indexName: 'BrandNameIndex',
      partitionKey: { name: 'brandName', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    const interactionsTable = new dynamodb.Table(this, 'InteractionsTable', {
      tableName: 'drug-interaction-interactions',
      partitionKey: { name: 'drugPair', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'severity', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // GSI for finding all interactions for a specific drug
    interactionsTable.addGlobalSecondaryIndex({
      indexName: 'DrugAIndex',
      partitionKey: { name: 'drugA', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'severity', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    interactionsTable.addGlobalSecondaryIndex({
      indexName: 'DrugBIndex',
      partitionKey: { name: 'drugB', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'severity', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    const sideEffectsTable = new dynamodb.Table(this, 'SideEffectsTable', {
      tableName: 'drug-interaction-side-effects',
      partitionKey: { name: 'drugId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'effectId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    sideEffectsTable.addGlobalSecondaryIndex({
      indexName: 'TimelineIndex',
      partitionKey: { name: 'timeline', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'severity', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // S3 Bucket for static assets and data storage
    const dataBucket = new s3.Bucket(this, 'DataBucket', {
      bucketName: `drug-interaction-data-${this.account}-${this.region}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: true,
      lifecycleRules: [{
        id: 'DeleteOldVersions',
        noncurrentVersionExpiration: cdk.Duration.days(30),
      }],
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // IAM Role for Lambda functions
    const lambdaRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
      inlinePolicies: {
        DynamoDBAccess: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'dynamodb:GetItem',
                'dynamodb:PutItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem',
                'dynamodb:Query',
                'dynamodb:Scan',
                'dynamodb:BatchGetItem',
                'dynamodb:BatchWriteItem',
              ],
              resources: [
                drugsTable.tableArn,
                interactionsTable.tableArn,
                sideEffectsTable.tableArn,
                `${drugsTable.tableArn}/index/*`,
                `${interactionsTable.tableArn}/index/*`,
                `${sideEffectsTable.tableArn}/index/*`,
              ],
            }),
          ],
        }),
        BedrockAccess: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'bedrock:InvokeModel',
                'bedrock:InvokeModelWithResponseStream',
              ],
              resources: [
                'arn:aws:bedrock:*::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
                'arn:aws:bedrock:*::foundation-model/amazon.titan-text-express-v1',
              ],
            }),
          ],
        }),
        ComprehendMedicalAccess: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'comprehendmedical:DetectEntitiesV2',
                'comprehendmedical:InferICD10CM',
                'comprehendmedical:InferRxNorm',
              ],
              resources: ['*'],
            }),
          ],
        }),
        S3Access: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:GetObject',
                's3:PutObject',
                's3:DeleteObject',
              ],
              resources: [`${dataBucket.bucketArn}/*`],
            }),
          ],
        }),
      },
    });

    // Lambda Layer for shared dependencies
    const sharedLayer = new lambda.LayerVersion(this, 'SharedLayer', {
      layerVersionName: 'drug-interaction-shared',
      code: lambda.Code.fromAsset('lambda-layers/shared'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
      description: 'Shared utilities and dependencies for drug interaction checker',
    });

    // Environment variables for Lambda functions
    const lambdaEnvironment = {
      DRUGS_TABLE_NAME: drugsTable.tableName,
      INTERACTIONS_TABLE_NAME: interactionsTable.tableName,
      SIDE_EFFECTS_TABLE_NAME: sideEffectsTable.tableName,
      DATA_BUCKET_NAME: dataBucket.bucketName,
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      LOG_LEVEL: 'INFO',
    };

    // API Gateway
    const api = new apigateway.RestApi(this, 'DrugInteractionAPI', {
      restApiName: 'Drug Interaction Checker API',
      description: 'AI-Powered Drug-Drug Interaction Checker API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
      deployOptions: {
        stageName: 'v1',
        throttle: {
          rateLimit: 1000,
          burstLimit: 2000,
        },
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
    });

    // Output important values
    new cdk.CfnOutput(this, 'APIEndpoint', {
      value: api.url,
      description: 'Drug Interaction Checker API Endpoint',
    });

    new cdk.CfnOutput(this, 'DrugsTableName', {
      value: drugsTable.tableName,
      description: 'DynamoDB Drugs Table Name',
    });

    new cdk.CfnOutput(this, 'InteractionsTableName', {
      value: interactionsTable.tableName,
      description: 'DynamoDB Interactions Table Name',
    });

    new cdk.CfnOutput(this, 'SideEffectsTableName', {
      value: sideEffectsTable.tableName,
      description: 'DynamoDB Side Effects Table Name',
    });

    new cdk.CfnOutput(this, 'DataBucketName', {
      value: dataBucket.bucketName,
      description: 'S3 Data Bucket Name',
    });
  }
}
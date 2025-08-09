#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DrugInteractionStack } from './drug-interaction-stack';

const app = new cdk.App();

new DrugInteractionStack(app, 'DrugInteractionCheckerStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'AI-Powered Drug-Drug Interaction Checker - Healthcare Safety Platform',
  tags: {
    Project: 'DrugInteractionChecker',
    Environment: 'Production',
    Creators: 'Govind-Ermanno',
    Purpose: 'Healthcare-AI-Hackathon'
  }
});
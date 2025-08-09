/**
 * Core data models for Drug-Drug Interaction Checker
 * Created by: Govind and Ermanno
 */

export interface Drug {
  id: string;                    // Unique identifier
  name: string;                  // Primary name
  genericName: string;           // Generic/chemical name
  brandNames: string[];          // Commercial names
  rxNormCode?: string;           // RxNorm identifier
  atcCode?: string;              // ATC classification
  description: string;           // Drug description
  therapeuticClass: string[];    // Therapeutic categories
  mechanism: string;             // Mechanism of action
  metabolism: string[];          // Metabolic pathways
  contraindications: string[];   // Absolute contraindications
  warnings: string[];            // Important warnings
}

export interface Interaction {
  id: string;
  drugA: Drug;
  drugB: Drug;
  severity: SeverityLevel;
  confidence: number;            // 0-1 confidence score
  mechanism: string;             // Biological mechanism
  clinicalEffects: string[];     // Observable effects
  onset: string;                 // Time to onset
  management: string;            // Management strategy
  evidence: Evidence;            // Supporting evidence
  lastUpdated: Date;
}

export interface SideEffect {
  id: string;
  name: string;
  description: string;
  frequency: FrequencyLevel;
  severity: SeverityLevel;
  timeline: TimelineLevel;
  onset: string;                 // Time to onset
  duration: string;              // Expected duration
  reversible: boolean;           // Whether effect is reversible
  monitoring: string[];          // Monitoring requirements
  management: string[];          // Management strategies
}

export interface Evidence {
  sources: string[];             // Data source names
  studyCount: number;            // Number of supporting studies
  caseReports: number;           // Number of case reports
  evidenceLevel: EvidenceLevel;  // Strength of evidence
  lastUpdated: Date;
}

export interface InteractionResult {
  interactions: Interaction[];
  alternatives: Alternative[];
  overlappingSideEffects: SideEffect[];
  responseTime: string;
  confidence: number;
}

export interface Alternative {
  replace: string;               // Drug to replace
  with: string;                  // Replacement drug
  reason: string;                // Reason for replacement
  therapeuticEquivalence: number; // 0-1 equivalence score
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

export interface ValidationError {
  code: ErrorCode;
  message: string;
  field: string;
  suggestions?: string[];
}

export interface MonitoringAdvice {
  parameter: string;             // What to monitor
  frequency: string;             // How often
  normalRange: string;           // Normal values
  actionThreshold: string;       // When to act
}

// Enums
export enum SeverityLevel {
  CRITICAL = 'CRITICAL',
  MAJOR = 'MAJOR',
  MODERATE = 'MODERATE',
  MINOR = 'MINOR'
}

export enum FrequencyLevel {
  VERY_COMMON = 'VERY_COMMON',   // >10%
  COMMON = 'COMMON',             // 1-10%
  UNCOMMON = 'UNCOMMON',         // 0.1-1%
  RARE = 'RARE',                 // 0.01-0.1%
  VERY_RARE = 'VERY_RARE'        // <0.01%
}

export enum TimelineLevel {
  IMMEDIATE = 'IMMEDIATE',       // Hours
  SHORT_TERM = 'SHORT_TERM',     // Days to weeks
  LONG_TERM = 'LONG_TERM'        // Months to years
}

export enum EvidenceLevel {
  HIGH = 'HIGH',                 // Multiple RCTs
  MODERATE = 'MODERATE',         // Some RCTs or many observational
  LOW = 'LOW',                   // Limited studies
  VERY_LOW = 'VERY_LOW'          // Case reports only
}

export enum ErrorCode {
  INVALID_DRUG_NAME = 'INVALID_DRUG_NAME',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  DRUG_NOT_FOUND = 'DRUG_NOT_FOUND',
  INTERACTION_DATA_UNAVAILABLE = 'INTERACTION_DATA_UNAVAILABLE',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  TIMEOUT = 'TIMEOUT'
}

// Natural Language Processing Types
export interface NLQuery {
  originalText: string;
  extractedDrugs: string[];
  intent: QueryIntent;
  confidence: number;
  context?: ConversationContext;
}

export interface ConversationContext {
  sessionId: string;
  previousQueries: string[];
  extractedEntities: Map<string, any>;
  userType: UserType;
}

export enum QueryIntent {
  CHECK_INTERACTIONS = 'CHECK_INTERACTIONS',
  GET_SIDE_EFFECTS = 'GET_SIDE_EFFECTS',
  FIND_ALTERNATIVES = 'FIND_ALTERNATIVES',
  GENERAL_INFO = 'GENERAL_INFO'
}

export enum UserType {
  PATIENT = 'PATIENT',
  HEALTHCARE_PROVIDER = 'HEALTHCARE_PROVIDER',
  PHARMACIST = 'PHARMACIST',
  RESEARCHER = 'RESEARCHER'
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: ErrorCode;
    message: string;
    details?: any;
  };
  metadata: {
    requestId: string;
    timestamp: string;
    responseTime: number;
  };
}
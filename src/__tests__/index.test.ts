/**
 * Basic tests for Drug-Drug Interaction Checker
 * Created by: Govind and Ermanno
 */

import { DrugInteractionChecker } from '../index';
import { Drug, SeverityLevel, FrequencyLevel, TimelineLevel } from '../types';

describe('DrugInteractionChecker', () => {
  let checker: DrugInteractionChecker;

  beforeEach(() => {
    checker = new DrugInteractionChecker();
  });

  test('should initialize successfully', () => {
    expect(checker).toBeInstanceOf(DrugInteractionChecker);
  });

  test('should handle empty drug list for interaction checking', async () => {
    const result = await checker.checkInteractions([]);
    expect(result).toEqual([]);
  });

  test('should handle single drug for side effects', async () => {
    const testDrug: Drug = {
      id: 'test-drug-1',
      name: 'Test Drug',
      genericName: 'test-generic',
      brandNames: ['TestBrand'],
      description: 'A test drug for unit testing',
      therapeuticClass: ['Test Class'],
      mechanism: 'Test mechanism',
      metabolism: ['Test pathway'],
      contraindications: [],
      warnings: []
    };

    const result = await checker.getSideEffects(testDrug);
    expect(Array.isArray(result)).toBe(true);
  });

  test('should validate core type definitions', () => {
    // Test that our enums are properly defined
    expect(SeverityLevel.CRITICAL).toBe('CRITICAL');
    expect(SeverityLevel.MAJOR).toBe('MAJOR');
    expect(SeverityLevel.MODERATE).toBe('MODERATE');
    expect(SeverityLevel.MINOR).toBe('MINOR');

    expect(FrequencyLevel.VERY_COMMON).toBe('VERY_COMMON');
    expect(FrequencyLevel.COMMON).toBe('COMMON');
    expect(FrequencyLevel.UNCOMMON).toBe('UNCOMMON');
    expect(FrequencyLevel.RARE).toBe('RARE');
    expect(FrequencyLevel.VERY_RARE).toBe('VERY_RARE');

    expect(TimelineLevel.IMMEDIATE).toBe('IMMEDIATE');
    expect(TimelineLevel.SHORT_TERM).toBe('SHORT_TERM');
    expect(TimelineLevel.LONG_TERM).toBe('LONG_TERM');
  });
});
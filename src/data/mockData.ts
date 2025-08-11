import { Drug, Interaction, SideEffect, SeverityLevel, FrequencyLevel, TimelineLevel, EvidenceLevel } from '../types';

// Mock drug data for development
export const mockDrugs: Drug[] = [
  {
    id: "1",
    name: "Warfarin",
    genericName: "warfarin sodium",
    brandNames: ["Coumadin", "Jantoven"],
    rxNormCode: "11289",
    atcCode: "B01AA03",
    description: "Anticoagulant medication used to prevent blood clots",
    therapeuticClass: ["Anticoagulants", "Vitamin K Antagonists"],
    mechanism: "Inhibits vitamin K-dependent clotting factors",
    metabolism: ["CYP2C9", "CYP1A2", "CYP3A4"],
    contraindications: ["Active bleeding", "Severe liver disease"],
    warnings: ["Regular INR monitoring required", "Bleeding risk"]
  },
  {
    id: "2",
    name: "Aspirin",
    genericName: "acetylsalicylic acid",
    brandNames: ["Bayer", "Bufferin", "Ecotrin"],
    rxNormCode: "1191",
    atcCode: "N02BA01",
    description: "NSAID used for pain relief and cardiovascular protection",
    therapeuticClass: ["NSAIDs", "Antiplatelet agents"],
    mechanism: "Irreversibly inhibits COX-1 and COX-2 enzymes",
    metabolism: ["Hepatic hydrolysis"],
    contraindications: ["Active GI bleeding", "Severe renal impairment"],
    warnings: ["GI bleeding risk", "Reye's syndrome in children"]
  },
  {
    id: "3",
    name: "Ibuprofen",
    genericName: "ibuprofen",
    brandNames: ["Advil", "Motrin", "Nurofen"],
    rxNormCode: "5640",
    atcCode: "M01AE01",
    description: "NSAID used for pain, inflammation, and fever reduction",
    therapeuticClass: ["NSAIDs"],
    mechanism: "Reversibly inhibits COX-1 and COX-2 enzymes",
    metabolism: ["CYP2C9", "CYP2C8"],
    contraindications: ["Active GI bleeding", "Severe heart failure"],
    warnings: ["Cardiovascular risk", "GI bleeding risk"]
  },
  {
    id: "4",
    name: "Metformin",
    genericName: "metformin hydrochloride",
    brandNames: ["Glucophage", "Fortamet", "Glumetza"],
    rxNormCode: "6809",
    atcCode: "A10BA02",
    description: "Antidiabetic medication for type 2 diabetes",
    therapeuticClass: ["Biguanides", "Antidiabetic agents"],
    mechanism: "Decreases hepatic glucose production",
    metabolism: ["Not metabolized - excreted unchanged"],
    contraindications: ["Severe renal impairment", "Metabolic acidosis"],
    warnings: ["Lactic acidosis risk", "Vitamin B12 deficiency"]
  },
  {
    id: "5",
    name: "Lisinopril",
    genericName: "lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    rxNormCode: "29046",
    atcCode: "C09AA03",
    description: "ACE inhibitor for hypertension and heart failure",
    therapeuticClass: ["ACE inhibitors", "Antihypertensives"],
    mechanism: "Inhibits angiotensin-converting enzyme",
    metabolism: ["Not metabolized - excreted unchanged"],
    contraindications: ["Angioedema history", "Pregnancy"],
    warnings: ["Hyperkalemia risk", "Renal function monitoring"]
  }
];

// Mock interaction data
export const mockInteractions: Interaction[] = [
  {
    id: "warfarin-aspirin",
    drugA: mockDrugs[0], // Warfarin
    drugB: mockDrugs[1], // Aspirin
    severity: SeverityLevel.MAJOR,
    confidence: 0.95,
    mechanism: "Increased bleeding risk due to anticoagulant and antiplatelet synergy",
    clinicalEffects: [
      "Prolonged bleeding time",
      "Increased bruising",
      "GI bleeding risk",
      "Intracranial hemorrhage risk"
    ],
    onset: "Within hours to days",
    management: "Monitor INR closely, consider dose adjustment, watch for bleeding signs",
    evidence: {
      sources: ["DrugBank", "FDA FAERS", "Clinical studies"],
      studyCount: 23,
      caseReports: 156,
      evidenceLevel: EvidenceLevel.HIGH,
      lastUpdated: new Date('2024-01-15')
    },
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: "aspirin-ibuprofen",
    drugA: mockDrugs[1], // Aspirin
    drugB: mockDrugs[2], // Ibuprofen
    severity: SeverityLevel.MODERATE,
    confidence: 0.88,
    mechanism: "Ibuprofen may interfere with aspirin's cardioprotective effects",
    clinicalEffects: [
      "Reduced cardioprotective benefit of aspirin",
      "Increased GI bleeding risk",
      "Potential renal effects"
    ],
    onset: "Immediate (competitive inhibition)",
    management: "Take aspirin 2 hours before ibuprofen, or use alternative pain relief",
    evidence: {
      sources: ["DrugBank", "Cardiology studies"],
      studyCount: 12,
      caseReports: 45,
      evidenceLevel: EvidenceLevel.MODERATE,
      lastUpdated: new Date('2024-01-10')
    },
    lastUpdated: new Date('2024-01-10')
  }
];

// Mock side effects data
export const mockSideEffects: SideEffect[] = [
  {
    id: "warfarin-bleeding",
    name: "Bleeding",
    description: "Increased risk of bleeding due to anticoagulant effects",
    frequency: FrequencyLevel.COMMON,
    severity: SeverityLevel.MAJOR,
    timeline: TimelineLevel.IMMEDIATE,
    onset: "Hours to days",
    duration: "While on medication",
    reversible: true,
    monitoring: ["INR levels", "Signs of bleeding", "Complete blood count"],
    management: ["Dose adjustment", "Vitamin K if severe", "Medical attention for major bleeding"]
  },
  {
    id: "aspirin-gi-upset",
    name: "Gastrointestinal upset",
    description: "Stomach irritation, nausea, and potential ulceration",
    frequency: FrequencyLevel.COMMON,
    severity: SeverityLevel.MODERATE,
    timeline: TimelineLevel.SHORT_TERM,
    onset: "Minutes to hours",
    duration: "Usually resolves with discontinuation",
    reversible: true,
    monitoring: ["GI symptoms", "Signs of bleeding"],
    management: ["Take with food", "Proton pump inhibitor if needed", "Discontinue if severe"]
  },
  {
    id: "metformin-gi-effects",
    name: "Gastrointestinal effects",
    description: "Nausea, diarrhea, and abdominal discomfort",
    frequency: FrequencyLevel.VERY_COMMON,
    severity: SeverityLevel.MINOR,
    timeline: TimelineLevel.SHORT_TERM,
    onset: "Days to weeks",
    duration: "Often improves with continued use",
    reversible: true,
    monitoring: ["GI tolerance", "Nutritional status"],
    management: ["Start with low dose", "Take with meals", "Gradual dose increase"]
  }
];

// Mock search function
export const searchDrugs = (query: string): Drug[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  return mockDrugs.filter(drug => 
    drug.name.toLowerCase().includes(searchTerm) ||
    drug.genericName.toLowerCase().includes(searchTerm) ||
    drug.brandNames.some(brand => brand.toLowerCase().includes(searchTerm))
  );
};

// Mock interaction check function
export const checkInteractions = (drugs: Drug[]): Interaction[] => {
  if (drugs.length < 2) return [];
  
  const interactions: Interaction[] = [];
  
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const drugA = drugs[i];
      const drugB = drugs[j];
      
      // Check if we have a mock interaction for this pair
      const interaction = mockInteractions.find(int => 
        (int.drugA.id === drugA.id && int.drugB.id === drugB.id) ||
        (int.drugA.id === drugB.id && int.drugB.id === drugA.id)
      );
      
      if (interaction) {
        interactions.push(interaction);
      }
    }
  }
  
  return interactions;
};

// Mock alternatives function
export const getAlternatives = (drug: Drug): Drug[] => {
  // Simple mock logic - return drugs from same therapeutic class
  return mockDrugs.filter(d => 
    d.id !== drug.id && 
    d.therapeuticClass.some(tc => drug.therapeuticClass.includes(tc))
  );
};
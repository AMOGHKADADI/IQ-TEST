
export enum AgeGroup {
  CHILD = 'Child (6-12)',
  TEEN = 'Teen (13-17)',
  ADULT = 'Adult (18+)'
}

export enum TestMode {
  SERIOUS = 'Serious (Full Assessment)',
  FAST = 'Fast (Quick Estimate)'
}

export enum CognitiveDomain {
  LOGICAL = 'Logical Reasoning',
  PATTERN = 'Pattern Recognition',
  MEMORY = 'Memory Span',
  VERBAL = 'Verbal Fluency',
  SPATIAL = 'Spatial Intelligence',
  SPEED = 'Processing Speed',
  DECISION = 'Decision-making'
}

export interface LocalizedString {
  en: string;
  hi: string;
  kn: string;
}

export interface Question {
  id: string;
  domain: CognitiveDomain;
  difficulty: number; // 1-10
  text: LocalizedString;
  options: LocalizedString[];
  correctIndex: number;
  imageUrl?: string;
}

export interface Drill {
  id: string;
  title: string;
  domain: string;
  difficulty: string;
  duration: string;
  description: string;
  instruction: string;
}

export interface TestResponse {
  questionId: string;
  selectedIndex: number;
  timeTaken: number; 
  isCorrect: boolean;
}

export interface TestResult {
  iqScore: number;
  confidenceBand: [number, number];
  domainScores: Record<CognitiveDomain, number>;
  totalTime: number;
  timestamp: string;
  certificateId: string;
  uniqueTagline: string;
  personalizedDrills?: Drill[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string; // Simulated local auth
  ageGroup: AgeGroup;
  testMode: TestMode;
  isPremium: boolean;
  history: TestResult[];
  completedDrillsToday?: string[];
  lastActiveDay?: string;
  streak?: number;
}

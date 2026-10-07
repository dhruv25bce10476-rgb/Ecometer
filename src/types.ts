export type CategoryId = 'food' | 'housing' | 'mobility' | 'consumption';

export interface Option {
  id: string;
  label: string;
  description: string;
  impactScore: number; // Contribution to Earths (e.g. 0.1 to 1.1)
  impactLevel: 'low' | 'moderate' | 'high' | 'very-high';
}

export interface Question {
  id: number;
  category: CategoryId;
  categoryName: string;
  categoryIcon: string;
  title: string;
  subtitle: string;
  options: Option[];
}

export interface CategoryResult {
  categoryId: CategoryId;
  name: string;
  score: number;
  percentageOfTotal: number;
  impactLevel: 'low' | 'moderate' | 'elevated' | 'critical';
  highestImpactAnswerTitle?: string;
  keyObservation: string;
}

export interface ImprovementTip {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  title: string;
  description: string;
  potentialEarthReduction: number;
  difficulty: 'Easy' | 'Moderate';
  impactTag: string;
}

export interface FootprintResult {
  totalEarths: number;
  personalOvershootDay: string;
  categoryResults: CategoryResult[];
  highestImpactCategory: CategoryResult;
  secondHighestCategory?: CategoryResult;
  selectedAnswers: Record<number, string>;
  recommendations: ImprovementTip[];
}

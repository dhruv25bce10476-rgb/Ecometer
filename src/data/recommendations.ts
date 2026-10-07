import { CategoryId, CategoryResult, FootprintResult, ImprovementTip, Question } from '../types';
import { BASE_INFRASTRUCTURE_EARTHS, QUIZ_QUESTIONS } from './quizData';

export const ACTION_PLEDGES: ImprovementTip[] = [
  {
    id: 'pledge-plant-meals',
    categoryId: 'food',
    categoryName: 'Food & Nutrition',
    title: 'Adopt "Meatless Mondays" (or 2 plant days/week)',
    description: 'Replacing red meat and poultry with legumes, beans, and grains two days a week cuts personal dietary land and emissions by ~25%.',
    potentialEarthReduction: 0.25,
    difficulty: 'Easy',
    impactTag: '-0.25 Earths',
  },
  {
    id: 'pledge-meal-prep',
    categoryId: 'food',
    categoryName: 'Food & Nutrition',
    title: 'Plan grocery lists & save fridge leftovers',
    description: 'Avoid impulsive supermarket buys and consume perishable leftovers before they expire. Halves food waste at zero cost.',
    potentialEarthReduction: 0.15,
    difficulty: 'Easy',
    impactTag: '-0.15 Earths',
  },
  {
    id: 'pledge-transit-commute',
    categoryId: 'mobility',
    categoryName: 'Mobility & Travel',
    title: 'Swap 2 solo driving days for transit, bike, or walk',
    description: 'Using city bus, metro, carpooling, or cycling for short campus/work trips cuts fuel consumption and parking headaches.',
    potentialEarthReduction: 0.30,
    difficulty: 'Easy',
    impactTag: '-0.30 Earths',
  },
  {
    id: 'pledge-train-flights',
    categoryId: 'mobility',
    categoryName: 'Mobility & Travel',
    title: 'Replace 1 short domestic flight with rail or overland',
    description: 'Trains produce up to 80% fewer emissions per passenger-kilometer than short-haul aviation hops.',
    potentialEarthReduction: 0.28,
    difficulty: 'Moderate',
    impactTag: '-0.28 Earths',
  },
  {
    id: 'pledge-thermostat-tweak',
    categoryId: 'housing',
    categoryName: 'Housing & Energy',
    title: 'Adjust thermostat 1°C–2°C (winter cooler, summer warmer)',
    description: 'Wear cozy sweaters in winter and use desk fans before cranking AC. Saves up to 10% on monthly electric heating bills.',
    potentialEarthReduction: 0.18,
    difficulty: 'Easy',
    impactTag: '-0.18 Earths',
  },
  {
    id: 'pledge-phantom-power',
    categoryId: 'housing',
    categoryName: 'Housing & Energy',
    title: 'Power strips for idle electronics & LED lighting',
    description: 'Switch off vampire electronics and phone chargers when not in use, and run cold-water laundry loads.',
    potentialEarthReduction: 0.12,
    difficulty: 'Easy',
    impactTag: '-0.12 Earths',
  },
  {
    id: 'pledge-thrift-secondhand',
    categoryId: 'consumption',
    categoryName: 'Consumption & Waste',
    title: 'Adopt a "30-Day Rule" & buy second-hand clothing',
    description: 'Pause 30 days before non-essential purchases and explore campus thrift racks, campus swap groups, or repair cafes.',
    potentialEarthReduction: 0.22,
    difficulty: 'Easy',
    impactTag: '-0.22 Earths',
  },
  {
    id: 'pledge-reusables-kit',
    categoryId: 'consumption',
    categoryName: 'Consumption & Waste',
    title: 'Carry a reusable water bottle & tote bag',
    description: 'Avoid single-use beverage containers and disposable grocery plastic sacks. An effortless habit that removes hundreds of plastics annually.',
    potentialEarthReduction: 0.14,
    difficulty: 'Easy',
    impactTag: '-0.14 Earths',
  },
  {
    id: 'pledge-shower-timer',
    categoryId: 'consumption',
    categoryName: 'Consumption & Waste',
    title: 'Keep daily showers under 6 minutes',
    description: 'Cutting shower duration from 12 minutes to 5–6 minutes saves over 40 liters of heated potable water every single day.',
    potentialEarthReduction: 0.12,
    difficulty: 'Easy',
    impactTag: '-0.12 Earths',
  },
];

export function calculateFootprint(selectedAnswers: Record<number, string>): FootprintResult {
  const categoryScores: Record<CategoryId, number> = {
    food: 0,
    housing: 0,
    mobility: 0,
    consumption: 0,
  };

  const highestPerCategory: Record<CategoryId, { question: Question; score: number; label: string }> = {
    food: { question: QUIZ_QUESTIONS[0], score: 0, label: '' },
    housing: { question: QUIZ_QUESTIONS[2], score: 0, label: '' },
    mobility: { question: QUIZ_QUESTIONS[5], score: 0, label: '' },
    consumption: { question: QUIZ_QUESTIONS[7], score: 0, label: '' },
  };

  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = selectedAnswers[question.id];
    const option = question.options.find((o) => o.id === selectedOptionId) || question.options[1];
    categoryScores[question.category] += option.impactScore;

    if (option.impactScore > highestPerCategory[question.category].score) {
      highestPerCategory[question.category] = {
        question,
        score: option.impactScore,
        label: option.label,
      };
    }
  }

  const rawTotal =
    BASE_INFRASTRUCTURE_EARTHS +
    categoryScores.food +
    categoryScores.housing +
    categoryScores.mobility +
    categoryScores.consumption;

  // Round total Earths to 1 decimal place (e.g. 2.4 Earths)
  const totalEarths = Math.round(rawTotal * 10) / 10;

  // Calculate Personal Earth Overshoot Day
  // If Earths <= 1.0, Overshoot Day is not reached in the calendar year!
  // If Earths > 1.0, Day = 365 / totalEarths day of the year.
  let personalOvershootDay = 'Not reached (Sustainable year-round)';
  if (totalEarths > 1.0) {
    const dayOfYear = Math.min(365, Math.max(1, Math.round(365 / totalEarths)));
    const date = new Date(2026, 0, dayOfYear);
    personalOvershootDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }

  // Build Category Results
  const categoryNames: Record<CategoryId, string> = {
    food: 'Food & Nutrition',
    housing: 'Housing & Energy',
    mobility: 'Mobility & Travel',
    consumption: 'Goods, Water & Waste',
  };

  const categoryObservations: Record<CategoryId, string> = {
    food: 'Diet choices directly dictate pasture land and agricultural fertilizer requirements.',
    housing: 'Heating, insulation, and home scale determine steady background electricity loads.',
    mobility: 'Daily commuting fuel and air travel have the fastest personal carbon accumulation.',
    consumption: 'Embodied supply chain emissions and packaging create persistent municipal waste.',
  };

  const categoryResults: CategoryResult[] = (['food', 'housing', 'mobility', 'consumption'] as CategoryId[]).map(
    (catId) => {
      const score = Math.round(categoryScores[catId] * 100) / 100;
      const percentageOfTotal = Math.round((score / rawTotal) * 100);
      let impactLevel: CategoryResult['impactLevel'] = 'moderate';
      if (score < 0.3) impactLevel = 'low';
      else if (score < 0.7) impactLevel = 'moderate';
      else if (score < 1.1) impactLevel = 'elevated';
      else impactLevel = 'critical';

      return {
        categoryId: catId,
        name: categoryNames[catId],
        score,
        percentageOfTotal,
        impactLevel,
        highestImpactAnswerTitle: highestPerCategory[catId].label,
        keyObservation: categoryObservations[catId],
      };
    }
  );

  // Sort descending to find highest impact categories
  const sortedCategories = [...categoryResults].sort((a, b) => b.score - a.score);
  const highestImpactCategory = sortedCategories[0];
  const secondHighestCategory = sortedCategories[1];

  // Filter realistic recommendations tailored to user's highest impact categories
  const relevantRecommendations: ImprovementTip[] = [];
  const primaryPledges = ACTION_PLEDGES.filter(
    (p) => p.categoryId === highestImpactCategory.categoryId || p.categoryId === secondHighestCategory.categoryId
  );
  const secondaryPledges = ACTION_PLEDGES.filter(
    (p) => p.categoryId !== highestImpactCategory.categoryId && p.categoryId !== secondHighestCategory.categoryId
  );

  relevantRecommendations.push(...primaryPledges.slice(0, 3));
  if (relevantRecommendations.length < 4) {
    relevantRecommendations.push(...secondaryPledges.slice(0, 4 - relevantRecommendations.length));
  }

  return {
    totalEarths,
    personalOvershootDay,
    categoryResults,
    highestImpactCategory,
    secondHighestCategory,
    selectedAnswers,
    recommendations: relevantRecommendations,
  };
}

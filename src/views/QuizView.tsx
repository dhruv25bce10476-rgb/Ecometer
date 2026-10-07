import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { ArrowLeft, ArrowRight, CheckCircle2, Utensils, Home, Car, PackageCheck, Zap, Droplets, Recycle, Apple, Thermometer, Compass, Plane, ShoppingBag } from 'lucide-react';

interface QuizViewProps {
  onComplete: (answers: Record<number, string>) => void;
  savedAnswers?: Record<number, string>;
  onBackToHome: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  onComplete,
  savedAnswers = {},
  onBackToHome,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(savedAnswers);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[currentQuestion.id];

  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Keyboard navigation for options (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[index]) {
          handleSelectOption(currentQuestion.options[index].id);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (selectedOptionId) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedOptionId, currentQuestionIndex]);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 10 questions!
      onComplete(selectedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToHome();
    }
  };

  // Helper for question icon
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Salad':
      case 'Apple':
        return <Apple className="w-4 h-4 text-emerald-700" />;
      case 'Home':
        return <Home className="w-4 h-4 text-emerald-700" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-emerald-700" />;
      case 'Thermometer':
        return <Thermometer className="w-4 h-4 text-emerald-700" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-emerald-700" />;
      case 'Plane':
        return <Plane className="w-4 h-4 text-emerald-700" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-emerald-700" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-emerald-700" />;
      case 'Recycle':
        return <Recycle className="w-4 h-4 text-emerald-700" />;
      default:
        return <Utensils className="w-4 h-4 text-emerald-700" />;
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const canProceed = !!selectedOptionId;

  return (
    <div className="max-w-2xl mx-auto py-4 md:py-8 px-4">
      {/* Top Bar: Back button, Question Counter, Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentQuestionIndex === 0 ? 'Home' : 'Previous'}</span>
          </button>

          <span className="text-slate-900 font-bold tracking-tight">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>

          <span className="tabular-nums text-emerald-800">{progressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card (Showing ONE question at a time) */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 md:p-8 shadow-xs">
        {/* Category Lead */}
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-emerald-800">
          <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center shrink-0">
            {renderCategoryIcon(currentQuestion.categoryIcon)}
          </div>
          <span>{currentQuestion.categoryName}</span>
        </div>

        {/* Question Title */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight text-balance leading-snug">
          {currentQuestion.title}
        </h2>

        {/* Question Scientific Subtitle / Insight */}
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {currentQuestion.subtitle}
        </p>

        {/* Multiple Choice Options */}
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600/30'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                {/* Radio / Letter Badge */}
                <div
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {letter}
                </div>

                {/* Option text */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-semibold text-sm text-slate-900 leading-tight">
                      {option.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {option.impactLevel === 'low'
                        ? 'Low Footprint'
                        : option.impactLevel === 'moderate'
                        ? 'Moderate'
                        : option.impactLevel === 'high'
                        ? 'High Demand'
                        : 'Intensive'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{option.description}</p>
                </div>

                {/* Checkmark indicator if active */}
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation within card */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            <span>Tip: Press 1, 2, 3, or 4 on your keyboard</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-lg transition-all shadow-xs cursor-pointer ${
                canProceed
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'View My Results' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

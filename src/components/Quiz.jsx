import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

function Quiz({ questions = [], onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Calculate progress
  const progress = (currentQuestion / questions?.length) * 100;

  // Handle answer selection
  const handleAnswerSelect = useCallback((questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }, []);

  // Handle navigation
  const handlePrevious = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  }, []);

  // Calculate final score
  const calculateScore = useCallback(() => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    setScore((correct / questions.length) * 100);
  }, [questions, selectedAnswers]);

  // Handle quiz completion
  const handleComplete = useCallback(() => {
    calculateScore();
    setShowResults(true);
    onComplete?.(score);
  }, [calculateScore, onComplete, score]);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  }, [calculateScore, currentQuestion, questions.length]);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  }, []);

  // Accessibility: Focus management
  useEffect(() => {
    const questionElement = document.getElementById(
      `question-${currentQuestion}`,
    );
    if (questionElement) {
      questionElement.focus();
    }
  }, [currentQuestion]);

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <Trophy className="mb-4 h-16 w-16 text-yellow-500" />
        <h2 className="mb-4 text-2xl font-bold">Quiz Complete!</h2>
        <p className="mb-4 text-lg">Your score: {score.toFixed(0)}%</p>
        <p className="mb-6 text-lg">
          {score === 100
            ? 'Perfect score! Excellent work!'
            : score >= 70
              ? 'Great job! Keep learning!'
              : "Keep practicing, you'll get better!"}
        </p>
        <button
          onClick={handleRetry}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          aria-label="Retry quiz"
        >
          Retry Quiz
        </button>
      </motion.div>
    );
  }

  if (!questions.length) {
    return (
      <div className="p-6 text-center">
        <p>No questions available for this quiz.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div
      className="mx-auto w-full max-w-3xl p-6"
      role="region"
      aria-label="Quiz"
    >
      {/* Progress Bar */}
      <div className="mb-8 h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Question */}
          <div
            id={`question-${currentQuestion}`}
            tabIndex="-1"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">
              Question {currentQuestion + 1} of {questions?.length}
            </h3>
            <p className="text-lg">{question.question}</p>
          </div>

          {/* Answers */}
          <ul
            className="space-y-3"
            role="radiogroup"
            aria-label="Answer options"
          >
            {['a', 'b', 'c', 'd'].map((option) => {
              const answerKey = `answer_${option}`;
              const isSelected = selectedAnswers[currentQuestion] === answerKey;

              return (
                <li key={option}>
                  <button
                    onClick={() =>
                      handleAnswerSelect(currentQuestion, answerKey)
                    }
                    className={`w-full rounded-lg p-4 text-left transition-all ${
                      isSelected
                        ? 'border-2 border-blue-500 bg-blue-100'
                        : 'border-2 border-gray-200 bg-white hover:border-blue-300'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Option ${option.toUpperCase()}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">
                        {option.toUpperCase()}.
                      </span>
                      <span>{question[answerKey]}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Navigation */}
          <div className="mt-8 flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                currentQuestion === 0
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label="Previous question"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentQuestion < questions?.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion]}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors ${
                  !selectedAnswers[currentQuestion]
                    ? 'cursor-not-allowed bg-blue-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                aria-label="Next question"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!selectedAnswers[currentQuestion]}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors ${
                  !selectedAnswers[currentQuestion]
                    ? 'cursor-not-allowed bg-green-400'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                aria-label="Complete quiz"
              >
                Complete Quiz
                <Trophy className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Quiz;

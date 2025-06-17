import { BookOpen, ChevronDown, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuestions } from '../hooks/useQuestions';

const questions = [
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Mathematics',
    correct_answer: 'answer_a',
    id: 1,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Science',
    correct_answer: 'answer_a',
    id: 2,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Language',
    correct_answer: 'answer_a',
    id: 3,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Economics & Business',
    correct_answer: 'answer_a',
    id: 4,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'History & Social Studies',
    correct_answer: 'answer_a',
    id: 5,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Writing',
    correct_answer: 'answer_a',
    id: 6,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Other',
    correct_answer: 'answer_a',
    id: 7,
    question: 'question 2',
  },
  {
    answer_a: 'hi ',
    answer_b: 'hello',
    answer_c: 'welcome',
    answer_d: 'hell yeah',
    category: 'Thinking & Speaking',
    correct_answer: 'answer_a',
    id: 8,
    question: 'question 2',
  },
];

function QuestionBank() {
  const { questions, isLoading } = useQuestions();

  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter values from URL params with defaults
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';

  // Update URL params when filters change
  const handleSearchChange = (value) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set('search', value);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  const handleCategoryChange = (value) => {
    setSearchParams((prev) => {
      if (value === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', value);
      }
      return prev;
    });
  };

  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      if (value === 'newest') {
        prev.delete('sort');
      } else {
        prev.set('sort', value);
      }
      return prev;
    });
  };

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(questions.map((q) => q.category))];
  }, [questions]);

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((question) => {
        const matchesSearch = question.question
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || question.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'oldest':
            return a.id - b.id;
          case 'category':
            return a.category.localeCompare(b.category);
          case 'newest':
          default:
            return b.id - a.id;
        }
      });
  }, [searchQuery, selectedCategory, sortBy]);

  // if(isLoading)
  // return

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="from-main-txt to-main-txt/85 bg-gradient-to-r py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-2 text-3xl font-bold">Question Bank</h1>
              <p className="text-blue-100">
                Manage and organize your questions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-10 bg-white py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Search Bar */}
            <div className="relative w-full flex-1">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="focus:border-main-txt focus:ring-main-txt w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-1 focus:outline-0"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="focus:border-main-txt focus:ring- focus:ring-main-txt appearance-none rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:outline-0"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="focus:border-main-txt focus:ring-main-txt appearance-none rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:ring-1 focus:outline-0"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="category">By Category</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Questions List */}
      {isLoading ? (
        <div className="mt-30 flex justify-center">
          <Spinner size={100} />
        </div>
      ) : (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Question
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Correct Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredQuestions.map((question) => (
                      <motion.tr
                        key={question.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {question.question}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            <div>A: {question.answer_a}</div>
                            <div>B: {question.answer_b}</div>
                            <div>C: {question.answer_c}</div>
                            <div>D: {question.answer_d}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs leading-5 font-semibold text-blue-800">
                            {question.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {question.correct_answer
                            .replace('answer_', '')
                            .toUpperCase()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No Results */}
              {filteredQuestions.length === 0 && (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No questions found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you&apos;re
                    looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default QuestionBank;

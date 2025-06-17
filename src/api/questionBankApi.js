import supabase from '../../supabase';

export const getQuestions = async (/*category*/) => {
  const { data, error } = await supabase.from('questions').select(
    `
      *,
      lectures!inner (
        course_sections!inner (
          courses!inner (
            category
          )
        )
      )
    `,
  );
  // .eq('lectures.course_sections.courses.category', category)
  // .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching questions with category:', error);
    return [];
  }


  

  const questionsWithCategory = data.map((question) => ({
    question: question.question,
    answer_a: question.answer_a,
    answer_b: question.answer_b,
    answer_c: question.answer_c,
    answer_d: question.answer_d,
    correct_answer: question.correct_answer,
    id: question.id,
    category: question.lectures?.course_sections?.courses?.category,
  }));

  return questionsWithCategory;
};

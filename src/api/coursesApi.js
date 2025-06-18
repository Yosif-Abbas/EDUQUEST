import supabase from '../../supabase';

const PAGE_SIZE = 8;

export const getCourses = async ({ sort, filter, search, page }) => {
  let query = supabase.from('courses').select('*', { count: 'exact' });

  // Searching
  if (search && search.value) {
    const searchTerm = `%${search.value}%`;
    query = query.or(
      `title.ilike.${searchTerm},subject.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`,
    );
  }

  // Filtering
  if (filter && filter.value !== 'all') {
    query = query.ilike('category', `%${filter.value}%`);
  }

  // Sorting
  query = query.order(sort.value, { ascending: sort.order === 'asc' });

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw error;
  }

  return { data, count };
};

export const getCourse = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .select(
      `*,
        course_requirements(*),
        course_includes(*),
        course_benefits(*),
        course_sections(*, lectures(*, videos(*), questions(*))),
        teachers(*, users(*)),
        ratings(*),
        reviews(*, users(*))`,
    )
    .eq('id', id)
    .order('id', { foreignTable: 'course_sections.lectures', ascending: true })
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getCoursesByTeacherId = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', id);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export const getEnrolledCourses = async (studentId) => {
  let {
    data: student_courses,
    isLoading,
    count,
    error,
    isError,
  } = await supabase
    .from('student_courses')
    .select('created_at, id, is_active, is_completed, course_id(*)', {
      count: 'exact',
    })
    .eq('student_id', studentId);

  if (error) {
    throw new Error('Error fetching student courses');
  }

  return { student_courses, isLoading, count, error, isError };
};

export const getEnrolledCourse = async ({ studentId, courseId }) => {
  const { data, error } = await supabase
    .from('student_courses')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .single();

  if (error && status !== 406) {
    console.error(error.message);
    throw error;
  }

  return data ?? null;
};

export const enrollInCourse = async ({ studentId, courseId }) => {
  // Check if the record exists
  const { data: existing, error: checkError } = await supabase
    .from('student_courses')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (checkError) {
    console.error(checkError.message);
    throw checkError;
  }

  if (existing) {
    console.error('Already enrolled in this course');

    throw new Error('Already enrolled in this course');
  }

  // Insert if not existing
  const { data, error } = await supabase
    .from('student_courses')
    .insert([
      {
        student_id: studentId,
        course_id: courseId,
        is_active: false,
        is_completed: false,
      },
    ])
    .select('*')
    .single();

  if (error) {
    console.error(error.message);
    throw error;
  }

  const { error: coursesError } = await supabase.rpc(
    'increment_students_enrolled',
    {
      course_id: courseId,
    },
  );

  if (coursesError) {
    console.error(error.message);
    throw error;
  }

  return data;
};

export async function getCategories() {
  const { data, error } = await supabase.from('courses').select('category');

  if (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
  const uniqueCategories = [...new Set(data.map((row) => row.category))];

  const filteredCategories = uniqueCategories.filter((cat) => cat !== 'Other');
  filteredCategories.push('Other');

  return filteredCategories;
}

export async function createNewCourse({ course, teacherId }) {
  if (!course) {
    throw new Error('Course data is required');
  }
  if (!teacherId) {
    throw new Error('Teacher ID is required');
  }
  const {
    // courses table data
    subject,
    title,
    regularPrice,
    discount,
    discount_end_date,
    currency,
    image_url,
    intro,
    rating,
    rating_count,
    students_enrolled,
    description,
    course_duration,
    number_of_lessons,
    course_level,
    category,

    // course_benefits
    course_benefits,
    // course_requirements
    course_requirements,
    // course_includes
    course_includes,
    //course_sections
    course_sections,
  } = course;

  const { data, error } = await supabase
    .from('courses')
    .insert([
      {
        subject: subject || '',
        title: title || '',
        image_url: image_url || '',
        intro: intro || '',
        regularPrice: regularPrice ? Number(regularPrice) : 0,
        discount: discount ? Number(discount) : 0,
        discount_end_date: discount_end_date || null,
        currency: currency || 'LE',
        rating: rating ? Number(rating) : 0,
        rating_count: rating_count ? Number(rating_count) : 0,
        students_enrolled: students_enrolled ? Number(students_enrolled) : 0,
        description: description || '',
        course_duration: course_duration ? Number(course_duration) : 0,
        number_of_lessons: number_of_lessons ? Number(number_of_lessons) : 0,
        course_level: course_level || 1,
        category: category || 'Other',
        teacher_id: teacherId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Create course error:', error.message);
    throw error;
  }

  // benefits
  const { data: benefits, error: benefitsError } = await supabase
    .from('course_benefits')
    .insert(course_benefits.map((text) => ({ text, course_id: data.id })))
    .select();

  if (benefitsError) {
    console.error('Create course error:', benefitsError.message);
    throw benefitsError;
  }

  // requirements
  const { data: requirements, error: requirementsError } = await supabase
    .from('course_requirements')
    .insert(course_requirements.map((text) => ({ text, course_id: data.id })))
    .select();

  if (requirementsError) {
    console.error('Create course error:', requirementsError.message);
    throw requirementsError;
  }

  // includes
  const { data: includes, error: includesError } = await supabase
    .from('course_includes')
    .insert(course_includes.map((text) => ({ text, course_id: data.id })))
    .select();

  if (includesError) {
    console.error('Create course error:', includesError.message);
    throw includesError;
  }

  const { data: ratings, error: ratingsError } = await supabase
    .from('ratings')
    .insert([
      {
        course_id: data.id,
        '1_stars': 0,
        '2_stars': 0,
        '3_stars': 0,
        '4_stars': 0,
        '5_stars': 0,
      },
    ])
    .select();

  if (ratingsError) {
    console.error('Create course error:', ratingsError.message);
    throw ratingsError;
  }

  for (const section of course_sections) {
    // Validate section data
    if (!section.title) {
      throw new Error('Section title is required');
    }

    // Insert course section with proper data formatting
    const { data: sectionData, error: sectionError } = await supabase
      .from('course_sections')
      .insert({
        title: section.title || '',
        duration: section.duration ? Number(section.duration) : 0,
        description: section.description || '',
        course_id: data.id,
      })
      .select()
      .single();

    if (sectionError) {
      console.error('Section insertion error:', sectionError);
      throw sectionError;
    }

    const sectionId = sectionData.id;

    for (const lecture of section.lectures) {
      // Insert lecture with proper data formatting
      const { data: lectureData, error: lectureError } = await supabase
        .from('lectures')
        .insert({
          title: lecture.title || '',
          type: lecture.type || 'video',
          content_info:
            lecture.type === 'quiz'
              ? `${lecture.questions?.length || 0} questions`
              : lecture.content_info || '',
          file_url: lecture.type === 'file' ? lecture.file_url || '' : null,
          section_id: sectionId,
        })
        .select()
        .single();

      if (lectureError) {
        console.error('Lecture insertion error:', lectureError);
        throw lectureError;
      }

      const lectureId = lectureData.id;

      // Insert quiz questions
      if (lecture.type === 'quiz') {
        if (lecture.questions && lecture.questions.length > 0) {
          lecture.questions.forEach(async (question) => {
            const { error: questionsError } = await supabase
              .from('questions')
              .insert([
                {
                  lecture_id: lectureId,
                  question: question.question,
                  correct_answer: question.correctAnswer,
                  answer_a: question.answer_a,
                  answer_b: question.answer_b,
                  answer_c: question.answer_c,
                  answer_d: question.answer_d,
                },
              ]);

            if (questionsError) {
              console.error('Quiz questions insertion error:', questionsError);
              throw questionsError;
            }
          });
        }
      }

      if (lecture.type === 'video' && lecture.file_url) {
        const { error: videoError } = await supabase.from('videos').insert({
          video_url: lecture.file_url,
          lecture_id: lectureId,
        });

        if (videoError) {
          console.error('Video insertion error:', videoError);
          throw videoError;
        }
      }
    }
  }

  return data;
}

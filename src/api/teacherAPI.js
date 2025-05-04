import supabase from '../../supabase';
import { getCurrentUser } from './authApi';

export async function getTeacher() {
  const currentTeacher = await getCurrentUser();

  if (currentTeacher.role !== 'teacher') return;

  let { data: teacherTitle, error } = await supabase
    .from('teachers')
    .select('title')
    .eq('user_id', currentTeacher.id)
    .single();

  if (error) {
    console.error(error.message);

    throw new Error('Error fetching teacher title');
  }

  return { ...currentTeacher, teacherTitle };
}

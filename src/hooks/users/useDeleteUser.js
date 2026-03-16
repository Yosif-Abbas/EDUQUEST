import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from './useCurrentUser';

import { deleteStudent, deleteTeacher } from '../../api/userApi';
import { logout } from '../../api/authApi';

export function useDeleteUser(userId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    currentUser: { role, id, user_id },
  } = useCurrentUser();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      role === 'student' ? deleteStudent({ id, user_id }) : deleteTeacher({ id, user_id }),
    onSuccess: async () => {
      logout();
      queryClient.clear();
      navigate('/login');
      toast.success('User Deleted Successfully!');
    },
    onError: async (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}

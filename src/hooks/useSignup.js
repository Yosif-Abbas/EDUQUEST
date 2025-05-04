import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signup as signupAPI } from '../api/authApi';

export function useSignup() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({
      first_name,
      last_name,
      role,
      phone_number,
      email,
      password,
    }) =>
      signupAPI({ first_name, last_name, role, phone_number, email, password }),
    onSuccess: (user) => {
      console.log(user?.role);
      queryClient.setQueryData(['user', user]);
      // queryClient.invalidateQueries(['user']);

      toast.success('Signup successful!');

      navigate(`/${user?.role}`, { replace: true });
    },
    onError: (error) => {
      console.error('Signup failed:', error.message);

      toast.error(error.message);
    },
  });

  return { signup, isLoading };
}

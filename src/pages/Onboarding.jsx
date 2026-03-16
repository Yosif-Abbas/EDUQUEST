import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

import { useUpdateUser } from '../hooks/users/useUpdateUser';
import { useCurrentUser } from '../hooks/users/useCurrentUser';

import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Role from '../components/Role';
import NotFound from './NotFound';
import PageLoading from '../components/PageLoading';

function Onboarding() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    currentUser: { id, first_name, last_name, role },
    isLoading: isLoadingUser,
  } = useCurrentUser();

  const fullName = first_name + (last_name ? ` ${last_name}` : '');

  const { updateUser, isLoading } = useUpdateUser();

  const validateRole = (values) => {
    const errors = {};

    if (values.role !== 'student' && values.role !== 'teacher') errors.role = 'Role required';
    return errors;
  };

  if (isLoading || isLoadingUser) return <PageLoading />;

  if (role === 'student') navigate('/student');
  if (role === 'teacher') navigate('/teacher');

  return (
    <div className="bg-l1 fixed top-0 right-0 bottom-0 left-0 z-900 flex h-full flex-col items-center justify-center">
      <Formik
        initialValues={{ role: '' }}
        validate={validateRole}
        onSubmit={
          // update user
          (values, { setSubmitting }) => {
            const role = values.role;
            updateUser(
              { id, obj: { role } },
              {
                onSuccess: (_, user) => {
                  queryClient.invalidateQueries({ queryKey: ['user'] });
                },
              },
            );
            setSubmitting(false);
          }
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="bg-main text-l1 flex flex-col justify-center p-2 shadow-xl"
            onSubmit={handleSubmit}
          >
            <h3>Welcome {fullName}!</h3>
            <p className="text-sm font-normal">Are you a teacher or a student?</p>
            <Role handleBlur={handleBlur} handleChange={handleChange} values={values} />

            <span className="text-sm text-red-400">
              {errors.role && touched.role && errors.role}
            </span>

            <Button type="submit" className="w-fit" disabled={isSubmitting}>
              {isSubmitting || isLoading ? <Spinner /> : 'Continue'}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Onboarding;

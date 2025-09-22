import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import Picture from '../components/Home/Picture';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

import { useUpdateUser } from '../hooks/useUpdateUser';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Role from '../components/Role';

function Onboarding() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const id = currentUser?.id || null;

  const { updateUser, isLoading } = useUpdateUser();

  const validateRole = (values) => {
    const errors = {};

    if (values.role !== 'student' && values.role !== 'teacher') errors.role = 'Role required';
    return errors;
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
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
                onSuccess: () => {
                  queryClient.removeQueries({ queryKey: ['user'] });
                  navigate(`/${role}/dashboard`);
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
            className="flex flex-col justify-center rounded-xl p-2 shadow-2xl"
            onSubmit={handleSubmit}
          >
            <h3>Welcome $name$!</h3>
            <p>Are you a teacher or a student?</p>
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

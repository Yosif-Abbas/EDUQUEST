import { FcGoogle } from 'react-icons/fc';
import SocialButton from './SocialButton';
import { FaGithub } from 'react-icons/fa';

function SocialButtonGroup({ forLogin = true }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <SocialButton icon={<FcGoogle />}>
        {forLogin ? 'Login' : 'Sign up'} with Google
      </SocialButton>
      <SocialButton icon={<FaGithub />}>
        {forLogin ? 'Login' : 'Sign up'} with Github
      </SocialButton>
    </div>
  );
}

export default SocialButtonGroup;

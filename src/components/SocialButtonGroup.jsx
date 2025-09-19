import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import SocialButton from './SocialButton';

function SocialButtonGroup({ signup = false }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <SocialButton icon={<FcGoogle />}>
        {signup ? 'Login' : 'Sign up'} with Google
      </SocialButton>
      <SocialButton icon={<FaGithub />}>
        {signup ? 'Login' : 'Sign up'} with Github
      </SocialButton>
    </div>
  );
}

export default SocialButtonGroup;

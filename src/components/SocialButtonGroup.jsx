import { FcGoogle } from 'react-icons/fc';
import SocialButton from './SocialButton';
import { FaGithub } from 'react-icons/fa';

function SocialButtonGroup() {
  return (
    <div className="flex items-center justify-around">
      <SocialButton icon={<FcGoogle />}>Sign up with Google</SocialButton>
      <SocialButton icon={<FaGithub />}>Sign up with Github</SocialButton>
    </div>
  );
}

export default SocialButtonGroup;

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

function SocialButtonGroup({ signup = false }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button>
        <FcGoogle />
        {signup ? 'Login' : 'Sign up'} with Google
      </button>

      <button>
        <FaGithub />
        {signup ? 'Login' : 'Sign up'} with Github
      </button>
    </div>
  );
}

export default SocialButtonGroup;

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { useLoginWithGithub } from '../hooks/auth/useLoginWithGithub';
import { useLoginWithGoogle } from '../hooks/auth/useLoginWithGoogle';

function SocialButtonGroup() {
  const { loginWithGithub, isLoadingGithub } = useLoginWithGithub();
  const { loginWithGoogle, isLoadingGoogle } = useLoginWithGoogle();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="list-icon border-alt-darker rounded-md border-[1px] bg-[#00000004] px-10 py-1.5 text-black hover:bg-[#00000008]"
        onClick={() => loginWithGoogle()}
        disabled={isLoadingGoogle}
      >
        <FcGoogle />
        <span className="text-[15px] text-nowrap">Continue with Google</span>
      </button>

      <button
        className="list-icon border-alt-darker rounded-md border-[1px] bg-[#00000004] px-10 py-1.5 text-black hover:bg-[#00000008]"
        onClick={() => loginWithGithub()}
        disabled={isLoadingGithub}
      >
        <FaGithub />
        <span className="text-[15px] text-nowrap">Continue with Github</span>
      </button>
    </div>
  );
}

export default SocialButtonGroup;

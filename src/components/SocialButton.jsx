import { useLocation } from 'react-router-dom';
import { BiLogoFacebook, BiLogoTwitter, BiLogoWhatsapp } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';

const platformConfigs = {
  facebook: {
    icon: <BiLogoFacebook color="#4E5566" />,
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  twitter: {
    icon: <BiLogoTwitter color="#4E5566" />,
    getUrl: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check this out!`,
  },
  whatsapp: {
    icon: <BiLogoWhatsapp color="#4E5566" />,
    getUrl: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  email: {
    icon: <CiMail color="#4E5566" />,
    getUrl: (url) =>
      `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`,
  },
};

const typeStyles = {
  primary:
    'rounded-2xl border-1 border-black px-2 py-1 md:px-3 md:py-2 md:text-[14px] text-[10px] text-black',
  secondary:
    'bg-[#F5F7FA] text-[#4E5566] text-xs font-normal py-1.5 px-2 hover:bg-[#dbdfe6] transition-all duration-200',
};

function SocialButton({ className, platform, type = 'primary' }) {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  const config = platformConfigs[platform];

  if (!config) return null;

  const handleClick = () => {
    const shareUrl = config.getUrl(currentUrl);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-2 whitespace-nowrap ${typeStyles[type]} ${className}`}
    >
      <span
        className={` ${type === 'secondary' ? 'text-xl' : 'text-4xl'} mr-1`}
      >
        {config.icon}
      </span>
    </button>
  );
}

export default SocialButton;

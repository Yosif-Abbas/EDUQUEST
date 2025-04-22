import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';

const CopyLinkButton = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const courseUrl = `${window.location.origin}${location.pathname}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset after 1 second
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex cursor-pointer items-center gap-2 bg-[#F5F7FA] px-2 py-1.5 text-xs font-normal whitespace-nowrap text-[#4E5566] transition-all duration-200 hover:bg-[#dbdfe6]"
    >
      <BiCopy color="#4E5566" />
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
};

export default CopyLinkButton;

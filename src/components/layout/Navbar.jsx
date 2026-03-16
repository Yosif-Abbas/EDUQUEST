import { useEffect, useState } from 'react';

import { RxHamburgerMenu } from 'react-icons/rx';

import Logo from '../Logo';
import NavLinks from './NavLinks';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="relative flex min-h-20 items-center justify-between bg-transparent px-6">
      <figure className="">
        <Logo />
      </figure>

      <button
        className="cursor-pointer text-3xl md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <RxHamburgerMenu />
      </button>
      <NavLinks isMobile={isMobile} isMenuOpen={isMenuOpen} />
    </nav>
  );
}

export default Navbar;

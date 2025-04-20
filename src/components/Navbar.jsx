import Logo from './Logo';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="relative container flex min-h-20 items-center justify-between bg-transparent">
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

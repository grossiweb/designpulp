'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Interior Design', href: 'http://www.balancedesignatlanta.com/', external: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e6e6e6] transition-all duration-300 ${
          isScrolled ? 'header-scrolled py-2' : 'py-6'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-4">
          {/* Mobile Header Layout */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              className="p-2 text-[#797979] hover:text-[#ff9300]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="block">
              <Image
                src={isScrolled ? '/images/leaf-icon.png' : '/images/logo.jpg'}
                alt="Design Pulp"
                width={isScrolled ? 45 : 180}
                height={isScrolled ? 45 : 113}
                className="transition-all duration-300"
                priority
              />
            </Link>

            <div className="w-10" />
          </div>

          {/* Desktop Header Layout - Logo on first row, Menu on second row */}
          <div className="hidden lg:block">
            {/* Row 1: Centered Logo */}
            <div className="flex justify-center pb-2">
              <Link href="/" className="block">
                <Image
                  src={isScrolled ? '/images/leaf-icon.png' : '/images/logo.jpg'}
                  alt="Design Pulp"
                  width={isScrolled ? 55 : 280}
                  height={isScrolled ? 55 : 175}
                  className="transition-all duration-300"
                  priority
                />
              </Link>
            </div>

            {/* Row 2: Centered Navigation */}
            <nav className="flex justify-center">
              <ul className="flex items-center space-x-12">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="nav-link"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="p-6">
          <button
            className="absolute top-4 right-4 p-2 text-[#797979] hover:text-[#ff9300]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-8">
            <Link href="/" className="inline-block mb-6" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/images/logo.jpg"
                alt="Design Pulp"
                width={140}
                height={88}
              />
            </Link>

            <nav>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-[70px] lg:h-[90px]' : 'h-[120px] lg:h-[240px]'}`} />
    </>
  );
}

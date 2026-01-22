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
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'header-scrolled py-2' : 'py-4'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-4">
          {/* Mobile Header Layout */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
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
                width={isScrolled ? 40 : 150}
                height={isScrolled ? 40 : 94}
                className="transition-all duration-300"
                priority
              />
            </Link>

            <div className="w-10" />
          </div>

          {/* Desktop Header Layout - Logo on first row, Menu on second row */}
          <div className="hidden lg:block">
            {/* Row 1: Centered Logo */}
            <div className="flex justify-center pb-4">
              <Link href="/" className="block">
                <Image
                  src={isScrolled ? '/images/leaf-icon.png' : '/images/logo.jpg'}
                  alt="Design Pulp"
                  width={isScrolled ? 50 : 200}
                  height={isScrolled ? 50 : 125}
                  className="transition-all duration-300"
                  priority
                />
              </Link>
            </div>

            {/* Row 2: Centered Navigation */}
            <nav className="flex justify-center border-t border-gray-100 pt-4">
              <ul className="flex items-center space-x-10">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
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
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-8">
            <Link href="/" className="block mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Design Pulp"
                width={150}
                height={94}
              />
            </Link>

            <nav>
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-sm uppercase tracking-wider text-gray-700 hover:text-gray-900 py-2"
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
      <div className={`${isScrolled ? 'h-[80px]' : 'h-[200px]'} lg:${isScrolled ? 'h-[80px]' : 'h-[220px]'} transition-all duration-300`} />
    </>
  );
}

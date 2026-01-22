'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Mailchimp form submission
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('FNAME', firstName);
      formData.append('LNAME', lastName);

      // For Mailchimp, we'll redirect to their form
      const mailchimpUrl = `https://designpulp.us8.list-manage.com/subscribe/post?u=ce31f729f41eda322f10f222b&id=92014a3140&EMAIL=${encodeURIComponent(email)}&FNAME=${encodeURIComponent(firstName)}&LNAME=${encodeURIComponent(lastName)}`;

      window.open(mailchimpUrl, '_blank');
      setMessage('Thank you for subscribing!');
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#565656] text-white">
      {/* Top Section - Newsletter Left Aligned */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <div className="max-w-md">
          <h5 className="text-lg font-medium mb-6 uppercase tracking-wider">Newsletter</h5>

          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <p className="text-sm mb-4 text-gray-300">
              <span className="text-red-400">*</span> indicates required
            </p>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm mb-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 text-white px-6 py-2 uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>

            {message && (
              <p className="mt-4 text-sm text-green-300">{message}</p>
            )}
          </form>
        </div>
      </div>

      {/* Border */}
      <div className="border-t border-[#eaeaea]" />

      {/* Bottom Section */}
      <div className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/">
              <Image
                src="/images/leaf-icon.png"
                alt="Design Pulp"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex-1 text-center md:text-right">
            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-4 mb-4">
              <a
                href="https://www.facebook.com/BalanceDesignAtlanta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/balancedesatl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/balance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/balancedesignatl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.houzz.com/pro/balancedesignatlanta/balance-design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Houzz"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.382 12.001l8.24-4.757v19.057H.382zM23.618 7.243L12.005 0v24l11.613-6.699z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Design Pulp. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

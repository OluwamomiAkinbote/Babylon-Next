'use client';

import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const MobileHeader = ({ navbarCategories, menuOpen, setMenuOpen, API_URL }) => {
  return (
    <>
      <div className="container mx-auto flex justify-between items-center p-4 md:hidden">
        <Link href="/">
          <Image
            src={`${API_URL}/static/images/logoheader.png`}
            alt="Logo"
            className="h-12"
            width={50}
            height={50}
            priority
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href="/signin" 
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
            aria-label="Sign in"
          >
            <FaUserCircle className="text-green-600 text-xl" />
          </Link>
          <button 
            onClick={() => setMenuOpen(true)} 
            className="text-green-600"
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-black z-50 flex flex-col p-6">
          <button
            className="absolute top-4 right-4 text-green-600"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes size={30} />
          </button>
          <div className="mt-10 space-y-4">
            {navbarCategories.map((cat, index) => (
              <div key={index}>
                <Link 
                  href={`/category/${cat.slug}`} 
                  className="font-semibold text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
                {cat.has_subcategories && (
                  <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-700">
                    {cat.subcategories.map((sub, i) => (
                      <li key={i}>
                        <Link 
                          href={`/category/${sub.slug}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader; 
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaBars, FaTimes, FaSearch, FaUser, FaUserPlus } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { API_URL } from "../config";
import StoryView from "./Story/StoryView";
import MediaRenderer from "../Home/MediaRenderer";
import Image from "next/image";

const Header = () => {
  const [navbarCategories, setNavbarCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const router = useRouter();

  const handleMediaClick = (slug) => {
    router.push(`/news/${slug}`);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/header`)
      .then((response) => setNavbarCategories(response.data.navbar_categories))
      .catch((error) => console.error("Error fetching header data:", error));
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white border-b border-green-600 shadow-sm z-50 font-robotoCondensed">
        {/* Mobile Header */}
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
            <Link href="/signin">
              <FaUser size={20} className="text-green-600" />
            </Link>
            <Link href="/register/step-one">
              <FaUserPlus size={20} className="text-green-600" />
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

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center px-4 py-2 container mx-auto">
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

          <nav className="flex space-x-6 text-sm font-normal capitalize relative">
            {navbarCategories.map((cat, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => {
                  if (closeTimeout) clearTimeout(closeTimeout);
                  setActiveDropdown(idx);
                }}
                onMouseLeave={() => {
                  setCloseTimeout(setTimeout(() => setActiveDropdown(null), 200));
                }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 text-gray-800 hover:text-green-600"
                >
                  {cat.name}
                  {cat.has_subcategories && <ChevronDown size={14} />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-green-600" aria-label="Sign in">
              <FaUser size={24} />
            </Link>
            <Link href="/register/step-one" className="text-green-600" aria-label="Register">
              <FaUserPlus size={24} />
            </Link>
            <div className="bg-gray-100 border border-gray-300 rounded-full px-4 py-1 flex items-center">
                <Link href="/search" aria-label="Search">
                  <FaSearch size={22} className="text-green-600 hover:text-green-800" />
                </Link>

            </div>
          </div>
        </div>

        {/* Desktop Dropdown */}
        {activeDropdown !== null && (
          <div
            className="hidden md:block absolute top-full left-0 w-full bg-white border-t border-green-600 shadow-xl z-40"
            onMouseEnter={() => {
              if (closeTimeout) clearTimeout(closeTimeout);
              setActiveDropdown(activeDropdown);
            }}
            onMouseLeave={() => {
              setCloseTimeout(setTimeout(() => setActiveDropdown(null), 300));
            }}
          >
            <div className="container mx-auto">
              {navbarCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`${activeDropdown === idx ? "block" : "hidden"} py-6`}
                >
                  {cat.has_subcategories && (
                    <div className="max-w-6xl mx-auto flex px-6 gap-6">
                      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r pr-0 md:pr-4">
                        <h4 className="text-green-600 font-semibold mb-3">
                          Browse {cat.name}
                        </h4>
                        <ul className="space-y-2">
                          {cat.subcategories.map((sub, i) => (
                            <li key={i}>
                              <Link
                                href={`/category/${sub.slug}`}
                                className="text-gray-700 hover:text-green-700 text-sm"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h4 className="col-span-1 sm:col-span-2 text-green-600 font-semibold">
                          Latest News
                        </h4>
                        {cat.latest_posts.map((post, i) => (
                          <div
                            key={i}
                            onClick={() => handleMediaClick(post.slug)}
                            className="cursor-pointer group flex gap-3 hover:bg-gray-50 p-2 transition items-center"
                          >
                            <div className="w-24 h-16 overflow-hidden flex-shrink-0 relative">
                              <MediaRenderer
                                media={post.media}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 text-md font-medium text-gray-800 group-hover:text-green-700">
                              {post.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
      </header>

      <StoryView />
    </>
  );
};

export default Header;
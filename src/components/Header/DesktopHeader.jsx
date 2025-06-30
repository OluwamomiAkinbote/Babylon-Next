'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import Image from "next/image";
import MediaRenderer from "../Home/MediaRenderer";

const DesktopHeader = ({ 
  navbarCategories, 
  activeDropdown, 
  setActiveDropdown, 
  closeTimeout, 
  setCloseTimeout,
  API_URL 
}) => {
  const router = useRouter();

  const handleMediaClick = (slug) => {
    router.push(`/news/${slug}`);
  };

  return (
    <>
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
          <div className="bg-gray-100 border border-gray-300 rounded-full px-4 py-1 flex items-center">
            <Link href="/search" aria-label="Search">
              <FaSearch size={22} className="text-green-600 hover:text-green-800" />
            </Link>
          </div>
          <Link 
            href="/signin" 
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
            aria-label="Sign in"
          >
            <FaUserCircle className="text-green-600 text-2xl" />
          </Link>
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
                      <h4 className="col-span-1 sm:col-span-2 text-green-600 font-normal text-sm">
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
                          <div className="flex-1 text-sm font-normal text-gray-800 group-hover:text-green-700">
                            <a href={`/news/${post.slug}`} className="hover:underline">
                              {post.title}
                            </a>
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
    </>
  );
};

export default DesktopHeader;
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaRenderer from "./MediaRenderer";
import { API_URL } from "../config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const WorldNews = () => {
  const [worldNewsPosts, setWorldNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 4;
  const router = useRouter();

  useEffect(() => {
    const fetchWorldNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/world-news/`);
        setWorldNewsPosts(response.data.world_news_posts);
      } catch (error) {
        console.error("Error fetching world news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorldNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    });
  };

  const totalPages = Math.ceil(worldNewsPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const displayedPosts = worldNewsPosts.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="world_news px-2 py-4 font-robotoCondensed border-t border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <div className="flex space-x-2">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0} 
            className="p-2 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1} 
            className="p-2 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="5fca31" size={30} />
            </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <div key={post.id} className="bg-white duration-200">
                  <div className="relative">
                    <Link href={`/news/${post.slug}`}>
                      <MediaRenderer 
                        media={post.media} 
                        className="w-full h-48 object-cover cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    <Link 
                      href={`/news/${post.slug}`}
                      className="text-md font-medium mb-2 text-gray-800 hover:underline block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No world news found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldNews;
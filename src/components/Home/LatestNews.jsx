// app/components/LatestNews.js
'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import MediaRenderer from "./MediaRenderer";
import { API_URL } from "../config";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const LatestNews = () => {
  const [mainPost, setMainPost] = useState(null);
  const [politicsPosts, setPoliticsPosts] = useState([]);
  const [breakingPosts, setBreakingPosts] = useState([]);
  const [politicsIndex, setPoliticsIndex] = useState(0);
  const [breakingIndex, setBreakingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 5;
  const router = useRouter();

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

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/main-exclusive/`)
      .then((response) => {
        setMainPost(response.data.main_post);
        setPoliticsPosts(response.data.politics_posts || []);
        setBreakingPosts(response.data.breaking_posts || []);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const nextPolitics = () => {
    if (politicsIndex + postsPerPage < politicsPosts.length) {
      setPoliticsIndex(politicsIndex + postsPerPage);
    }
  };

  const prevPolitics = () => {
    if (politicsIndex - postsPerPage >= 0) {
      setPoliticsIndex(politicsIndex - postsPerPage);
    }
  };

  const nextBreaking = () => {
    if (breakingIndex + postsPerPage < breakingPosts.length) {
      setBreakingIndex(breakingIndex + postsPerPage);
    }
  };

  const prevBreaking = () => {
    if (breakingIndex - postsPerPage >= 0) {
      setBreakingIndex(breakingIndex - postsPerPage);
    }
  };

  const handleMediaClick = (slug) => {
    router.push(`/news/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader color="5fca31" size={30} />
      </div>
    );
  }

  return (
    <div className="px-2 py-4 bg-white font-robotoCondensed">
      {/* Heading Section */}
      <div className="section">
        <div className="heading">
          <h2>LATEST NEWS</h2>
        </div>
        <div className="line">
          <div className="highlight"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Main Post */}
        {mainPost && (
          <div className="col-span-1 md:col-span-3 lg:col-span-1 main_post mt-4">
            <div className="single_post mb-6">
              <div className="relative">
                <MediaRenderer 
                  media={mainPost.media} 
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleMediaClick(mainPost.slug)}
                />
                <span className="absolute bottom-0 left-0 bg-red-600 text-white text-xs px-2 py-1">
                  NEWS
                </span>
              </div>
              <div className="mt-4">
                <a href={`/news/${mainPost.slug}`} className="sm:text-lg font-medium text-gray-800 hover:underline font-robotoCondensed">
                  {mainPost.title.length > 80 ? mainPost.title.substring(0, 80) + "..." : mainPost.title}
                </a>
                <div className="meta text-xs text-gray-600 flex flex-col gap-2 mt-2">
                  <div className="flex space-x-2 sm:mb-0 mb-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                      <img src={`${API_URL}/static/images/logo2.png`} alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Newstropy</p>
                  </div>
                  <div className="meta text-xs text-gray-600 flex items-center mt-2 ">
                    <Clock className="text-red-500 text-xs mr-1" size={14} />
                    <p className="text-gray-700 text-sm">{formatDate(mainPost.date)}</p>
                  </div>

                  <p className="text-gray-600 mt-2 text-lg font-normal">
                    {stripHtml(mainPost.content)?.slice(0, 160) + "..."}
                  </p>
                  <a href={`/news/${mainPost.slug}`} className="text-red-600 hover:underline mt-4 block rounded-md shadow w-2/4 p-2 capitalize font-semibold bg-gray-200 text-lg">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Politics Posts */}
        <div className="col-span-1 other_posts grid grid-cols-1 gap-2 pt-4 relative">
          {politicsPosts.length > 0 ? (
            <>
              {politicsPosts.slice(politicsIndex, politicsIndex + postsPerPage).map((post) => (
                <div key={post.id} className="flex items-center justify-center border-b pb-4">
                  <div className="w-[120px] h-[86px] flex-shrink-0">
                    <MediaRenderer 
                      media={post.media} 
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleMediaClick(post.slug)}
                    />
                  </div>
                  <div className="md:w-2/3 sm:w-full ml-4">
                    <a href={`/news/${post.slug}`} className="sm:text-md font-medium text-gray-900 hover:underline block mb-2">
                      {post.title.length > 75 ? post.title.substring(0, 75) + "..." : post.title}
                    </a>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Clock className="text-red-500 text-xs mr-1" size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={prevPolitics}
                  disabled={politicsIndex === 0}
                  className={`p-1 rounded ${
                    politicsIndex === 0 ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextPolitics}
                  disabled={politicsIndex + postsPerPage >= politicsPosts.length}
                  className={`p-1 rounded ${
                    politicsIndex + postsPerPage >= politicsPosts.length ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <p>No politics posts available.</p>
          )}
        </div>

        {/* Breaking Posts */}
        <div className="col-span-1 latest_news_list pt-4 relative">
          {breakingPosts.length > 0 ? (
            <>
              {breakingPosts.slice(breakingIndex, breakingIndex + postsPerPage).map((post) => (
                <div key={post.id} className="mb-4 border-b pb-4">
                  <a href={`/news/${post.slug}`} className="sm:text-md font-medium text-gray-900 hover:underline block mb-2">
                    {post.title}
                  </a>
                  <div className="flex items-center text-gray-700 text-sm">
                    <Clock className="text-red-500 text-xs mr-1" size={14} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={prevBreaking}
                  disabled={breakingIndex === 0}
                  className={`p-1 rounded ${
                    breakingIndex === 0 ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextBreaking}
                  disabled={breakingIndex + postsPerPage >= breakingPosts.length}
                  className={`p-1 rounded ${
                    breakingIndex + postsPerPage >= breakingPosts.length ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <p>No breaking posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
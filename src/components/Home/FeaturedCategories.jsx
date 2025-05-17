"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { ChevronRight } from "lucide-react";
import { API_URL } from "../config";
import MediaRenderer from "./MediaRenderer";

const categories = ["Business", "Entertainment", "Health", "Energy"];

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

const FeaturedCategories = () => {
  const [categoryData, setCategoryData] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${API_URL}/featured-categories/`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const posts = categoryData[category] || [];

        return (
          <div key={category} className="bg-white p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-900">{category}</h2>
              <Link 
                href="#" 
                className="text-green-600 hover:text-blue-700 flex items-center"
                aria-label={`View more ${category} news`}
              >
                <ChevronRight size={26} />
              </Link>
            </div>

            {/* First post with MediaRenderer */}
            {posts.length > 0 && (
              <Link 
                href={`/news/${posts[0].slug}`}
                className="mb-4 cursor-pointer block"
              >
                <MediaRenderer
                  media={posts[0].media}
                  className="w-full h-40 object-cover mb-2"
                />
                <span className="sm:text-md font-medium mb-2 text-gray-800 hover:underline block">
                  {posts[0].title}
                </span>
                <p className="text-sm text-gray-500 mt-1">{formatDate(posts[0].date)}</p>
              </Link>
            )}

            {/* Next 2 posts */}
            <div className="space-y-3">
              {posts.slice(1, 3).map((post) => (
                <div key={post.id}>
                  <Link 
                    href={`/news/${post.slug}`}
                    className="text-md font-medium mb-2 text-gray-800 hover:underline block"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedCategories;
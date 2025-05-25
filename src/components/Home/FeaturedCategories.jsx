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
        const categorySlug = category.toLowerCase();

        return (
          <div key={category} className="bg-white p-4">
            {/* Redesigned Header */}
            <Link href={`/category/${categorySlug}`} className="group block mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-md font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                    {category}
                  </h2>
                  <div className="w-full h-px bg-gray-200 mt-1">
                    <div className="w-8 h-0.5 bg-green-600 group-hover:w-12 transition-all duration-300"></div>
                  </div>
                </div>

              </div>
            </Link>

            {/* Rest of the card remains exactly the same */}
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

            <div className="space-y-3">
              {posts.slice(1, 2).map((post) => (
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
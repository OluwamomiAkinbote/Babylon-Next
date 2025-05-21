// components/RelatedPosts.js
'use client'

import Link from 'next/link';
import { Clock } from 'lucide-react';

const RelatedPosts = ({ posts, title = "Related" }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mt-8">
      {/* Heading Section */}
      <div className="section">
        <div className="heading">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="line">
          <div className="highlight bg-red-600 h-1 w-16"></div>
        </div>
      </div>

      {/* Posts List */}
      <div className="mt-4 space-y-4">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border-b pb-4 last:border-b-0">
              <Link 
                href={`/news/${post.slug}`}
                className="text-black hover:text-red-600 font-medium text-base transition-colors"
              >
                {post.title}
              </Link>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Clock className="text-red-500 mr-1" size={12} />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 py-4">No {title.toLowerCase()} posts available.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedPosts;
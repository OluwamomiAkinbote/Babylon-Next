'use client';

import { Clock } from 'lucide-react';
import Link from 'next/link';

const RelatedPosts = ({ posts, title }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mt-8 border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
      <div className="section">
        <div className="heading">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="line">
          <div className="highlight bg-red-600 h-1 w-16"></div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {posts?.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start">
                <span className="text-gray-600 text-3xl font-bold mr-2 mt-0.5 min-w-[20px]">
                  {index + 1}.
                </span>
                <Link 
                  href={`/news/${post.slug}`}
                  className="text-black hover:underline font-medium text-base transition-colors flex-1"
                >
                  {post.title}
                </Link>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500 ml-6">
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

const BlogSidebar = ({ relatedPosts = [], recommendedPosts = [] }) => {
  return (
    <div className="mt-4 p-4">
      <RelatedPosts
        posts={relatedPosts}
        title="Related Posts"
      />
      <div className="mt-8">
        {/* <RelatedPosts
          posts={recommendedPosts}
          title="Recommended"
        /> */}
      </div>
    </div>
  );
};

export default BlogSidebar;
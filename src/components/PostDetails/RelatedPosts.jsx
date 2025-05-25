'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import MediaRenderer from '../Home/MediaRenderer';

const POSTS_PER_PAGE = 3;

const RelatedPosts = ({ posts = [], title = 'Read Next' }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="mt-8">
      {/* Header with pagination */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-medium">{title}</h2>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-1">
              {currentPage} of {totalPages}
            </span>
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
              className="p-1 text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 stroke-2" />
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              className="p-1 text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="h-5 w-5 stroke-2" />
            </button>
          </div>
        )}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/news/${post.slug}`} className="block">
              {/* Media container using MediaRenderer */}
              <div className="aspect-video bg-gray-50 mb-2 overflow-hidden relative">
                <MediaRenderer
                  media={post.media || post.featured_image} // Supports both media array and direct image URL
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Clock className="mr-1" size={12} />
                {formatDate(post.date || post.published_at || post.created_at)}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {paginatedPosts.length === 0 && (
        <div className="aspect-video bg-gray-50 flex items-center justify-center">
          <MediaRenderer media={null} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;
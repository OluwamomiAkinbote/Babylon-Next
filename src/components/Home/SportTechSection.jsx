import React from "react";
import MediaRenderer from "./MediaRenderer";

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

const SportTechSection = ({ title, posts }) => {
  if (!posts || posts.length === 0) return null;

  const featured = posts[0];
  const others = posts.slice(1);

  return (
    <div className="mb-10 border-b pb-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Post */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2 hover:underline cursor-pointer">
              <a href={`/news/${featured.slug}`}>{featured.title}</a>
            </h3>
            <p className="text-sm text-gray-700 mb-3 line-clamp-4">
              {featured.excerpt || featured.content.replace(/<[^>]+>/g, "")}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(featured.date)} 
            </p>
          </div>
          <div className="md:w-1/2">
            <MediaRenderer
              media={featured.media}
              className="w-full h-56 md:h-72 object-cover rounded-md"
              onClick={() => window.location.href = `/news/${featured.slug}`}
            />
        
          </div>
        </div>

        {/* Other Headlines */}
        <div className="space-y-4">
          {others.map((post) => (
            <div key={post.id} className="border-t pt-2">
              <a
                href={`/news/${post.slug}`}
                className="block text-sm font-medium text-gray-800 hover:underline"
              >
                {post.title}
              </a>
              <p className="text-xs text-gray-500">
                {formatDate(post.date)} 
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportTechSection;

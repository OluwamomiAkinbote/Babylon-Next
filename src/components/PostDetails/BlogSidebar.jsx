'use client';

import RelatedPosts from './RelatedPosts';

const BlogSidebar = ({ relatedPosts = [] }) => {
  return (
    <div className="mt-4">
      <RelatedPosts 
        posts={relatedPosts}
        title="Read Next"
      />
    </div>
  );
};

export default BlogSidebar;
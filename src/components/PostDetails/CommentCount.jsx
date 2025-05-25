'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const CommentCount = ({ url }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0&appId=376703375532188&autoLogAppEvents=1';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.FB) window.FB.XFBML.parse();
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="bg-red-700 text-white px-4 py-1 rounded-full inline-flex items-center text-sm font-semibold cursor-pointer"
      onClick={() => {
        // Optional scroll to comment section
        const commentSection = document.getElementById('fb-comment-section');
        if (commentSection) {
          commentSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <MessageCircle className="mr-2" size={16} />
      <span>
        Comments{' '}
        <span className="fb-comments-count" data-href={url}></span>
      </span>
    </div>
  );
};

export default CommentCount;

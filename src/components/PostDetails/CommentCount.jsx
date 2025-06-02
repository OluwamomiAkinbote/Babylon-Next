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
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-300 hover:bg-green-100 hover:border-green-300 transition cursor-pointer"
      onClick={() => {
        const commentSection = document.getElementById('fb-comment-section');
        if (commentSection) {
          commentSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <MessageCircle className="mr-1.5 text-green-600" size={14} />
      <span>
        Comments{' '}
        <span className="fb-comments-count" data-href={url}></span>
      </span>
    </div>
  );
};

export default CommentCount;

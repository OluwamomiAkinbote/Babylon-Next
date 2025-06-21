'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Clock, CalendarDays, Home, ChevronRight as ChevronRightIcon } from 'lucide-react';
import FacebookComment from './FacebookComment';
import { API_URL } from '../config';
import ShareControls from './ShareControls';
import BlogMedia from './BlogMedia';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import BlogSidebar from './BlogSidebar';
import CommentCount from './CommentCount';


const BlogDetails = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [seoData, setSeoData] = useState(null);
  const [advert, setAdvert] = useState('');
  const [error, setError] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const contentRef = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Lagos',
    });
  };

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`${API_URL}/news/${slug}/`)
      .then((response) => {
        if (response.data && response.data.post) {
          setPost(response.data.post);
          setRelatedPosts(response.data.related_posts || []);
          setRecommendedPosts(response.data.recommended_posts || []);
          setSeoData(response.data.seo);
          setAdvert(response.data.advert);
        } else {
          setError('Post not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post.');
      });
  }, [slug]);

  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!post) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z47KJ59Y0L"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z47KJ59Y0L');
        `}
      </Script>

      <div className="bg-white font-robotoCondensed sm:p-3 md:p-0 ">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 overflow-hidden">
          <div className="p-2 sm:col-span-2 overflow-hidden">
            <nav className="mb-4 text-md sm:text-md md:text-base">
              <ol className="list-none p-0 flex flex-wrap items-center">
                <li className="flex items-center">
                  <Link href="/" className="text-gray-700 hover:text-gray-900 flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </Link>
                  <ChevronRightIcon className="mx-2 text-gray-400 w-4 h-4" />
                </li>
                {post.category && (
                  <li className="flex items-center">
                    <Link
                      href={`/category/${post.category.slug}`}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {post.category.name}
                    </Link>
                  </li>
                )}
              </ol>
            </nav>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h2>

            {post.lead && (
              <div className="border-l-4 border-green-700 bg-green-50 px-4 py-3 mb-6 rounded-md">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {post.lead}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center font-poppins mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-700 font-medium ">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <div className="w-5 h-5 rounded-full bg-gray-200 relative">
                    <Image
                      src={`${API_URL}/static/images/logo2.png`}
                      alt="Author"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Newstropy
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                  <CalendarDays className="text-green-700" size={18} />
                  <p>{formatDate(post.date)}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                  <CommentCount url={currentUrl} />
                </div>

              </div>
            </div>

            <BlogMedia
              media={post.media}
              currentMediaIndex={currentMediaIndex}
              onMediaChange={setCurrentMediaIndex}
            />

            <ShareControls
              title={post.title}
              url={currentUrl}
              lead={post.lead ? post.lead.replace(/<[^>]+>/g, '') : ''}
              media={
                post.media && post.media.length > 0
                  ? post.media[0].media_url
                  : `${API_URL}/static/images/Breakingnews.png`
              }
              contentRef={contentRef}
              slug={post.slug}
            />

            <div
              id="contentContainer"
              className="py-0 overflow-hidden my-8"
              ref={contentRef}
              style={{ maxWidth: '1050px', margin: 'auto', lineHeight: '1.75' }}
            >
              <p className="leading-relaxed text-gray-800">
                <span
                  dangerouslySetInnerHTML={{
                    __html: advert.replace(/\n/g, '<br>'),
                  }}
                ></span>
              </p>
            </div>
            
            <div className="mt-6 mb-8" id="fb-comment-section">
              <FacebookComment url={currentUrl} />
            </div>
            <div className="mt-6 mb-8">
              {/* <BlogSidebar 
                relatedPosts={relatedPosts}
              /> */}
            </div>
{/* side bar */}

          </div>
          {/* advert banner */}
          <div className="w-full mx-auto my-8 p-2">
            <a
              href="https://maxonex-system.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-sm overflow-hidden shadow-sm"
            >
              <img
                src="https://boltzmann.s3.us-east-1.amazonaws.com/Abstract/Web-banner-square.png"
                alt="maxonex system"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </a>
          </div>



        </div>
      </div>
    </>
  );
};

export default BlogDetails;
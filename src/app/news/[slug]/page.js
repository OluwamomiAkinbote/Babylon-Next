import BlogDetails from '@/components/PostDetails/BlogDetails';
import { notFound } from 'next/navigation';
import { API_URL } from '@/components/config';
import "./../../globals.css";

// Fetch all posts for static generation
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/news/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    const posts = Array.isArray(data) ? data : data.results;

    if (!Array.isArray(posts)) {
      throw new Error('Fetched data is not an array');
    }

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Full error generating static params:', error);
    return [];
  }
}

// Fetch single post data
async function getPostData(slug) {
  try {
    const response = await fetch(`${API_URL}/news/${slug}/`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      console.error(`Failed to fetch post ${slug}:`, response.status);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  // Base URLs
  const PUBLIC_URL = 'https://www.newstropy.online';
  const DEFAULT_IMAGE = 'https://boltzmann.s3.us-east-1.amazonaws.com/Abstract/seo-logo-image.png';

  if (!post || !post.seo) {
    return {
      title: 'Post Not Found - Newstropy',
      description: 'The requested news article could not be found',
      openGraph: {
        images: [DEFAULT_IMAGE],
      },
      twitter: {
        card: 'summary_large_image',
        images: [DEFAULT_IMAGE],
      }
    };
  }

  const seo = post.seo;
  
  // Handle Django-generated URLs (convert API URLs to public domain when needed)
  const canonicalUrl = seo.url 
    ? seo.url.replace('ayo.newstropy.online', 'www.newstropy.online')
    : `${PUBLIC_URL}/news/${slug}`;

  

  return {
    title: seo.title || 'Newstropy - Latest News',
    description: seo.description || 'Breaking news coverage and in-depth reporting',
    metadataBase: new URL(PUBLIC_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title || 'Newstropy - Latest News',
      description: seo.description || 'Breaking news updates 24/7',
      url: canonicalUrl,
      type: 'article',
      publishedTime: seo.date || new Date().toISOString(),
      images: [
        {
          url: seo.image_url,
          width: 1200,
          height: 630,
          alt: seo.title || 'Newstropy Breaking News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || 'Newstropy - Latest News',
      description: seo.description || 'Breaking news updates',
      images: seo.image_url,
    },
  };
}


export default async function BlogPage(props) {
  const params = await props.params; // 👈 Await the params object
  const { slug } = params;

  const post = await getPostData(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <BlogDetails post={post} />
    </div>
  );
}

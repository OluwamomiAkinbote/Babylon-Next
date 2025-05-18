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

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;

  const post = await getPostData(slug);

  if (!post || !post.seo) {
    return {
      title: 'Post Not Found - Newstropy',
      description: 'The requested news article could not be found',
    };
  }

  const seo = post.seo;

  return {
    title: seo.title || 'Newstropy - Latest News',
    description: seo.description || 'Stay updated with the latest news from Newstropy',
    metadataBase: new URL(API_URL),
    alternates: {
      canonical: seo.url || `/news/${slug}`,
    },
    openGraph: {
      title: seo.title || 'Newstropy - Latest News',
      description: seo.description || 'Stay updated with the latest news from Newstropy',
      url: seo.url || `/news/${slug}`,
      type: seo.type || 'article',
      publishedTime: seo.date || null,
      images: [
        {
          url: seo.image_url || `${API_URL}/static/images/Breakingnews.png`,
          width: 1200,
          height: 630,
          alt: seo.title || 'Newstropy News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || 'Newstropy - Latest News',
      description: seo.description || 'Stay updated with the latest news from Newstropy',
      images: [seo.image_url || `${API_URL}/static/images/Breakingnews.png`],
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

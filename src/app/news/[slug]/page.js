import BlogDetails from '@/components/PostDetails/BlogDetails';
import { notFound } from 'next/navigation';
import { API_URL } from '@/components/config';


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
  const params = await props.params; // 👈 Await this
  const { slug } = params;

  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Newstropy',
      description: 'The requested news article could not be found',
    };
  }

  const imageUrl = post?.media?.[0]?.media_url || `${API_URL}/static/images/Breakingnews.png`;

  return {
    title: post.title || 'Newstropy - Latest News',
    description: post.lead || 'Stay updated with the latest news from Newstropy',
    metadataBase: new URL(API_URL),
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: post.title || 'Newstropy - Latest News',
      description: post.lead || 'Stay updated with the latest news from Newstropy',
      url: `/news/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title || 'Newstropy News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title || 'Newstropy - Latest News',
      description: post.lead || 'Stay updated with the latest news from Newstropy',
      images: [imageUrl],
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

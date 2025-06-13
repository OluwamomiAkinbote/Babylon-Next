import { notFound } from 'next/navigation';
import { API_URL } from '@/components/config';
import CategoryPage from '@/components/Category/CategoryPage';

// Fetch category data
async function getCategoryData(slug) {
  try {
    const response = await fetch(`${API_URL}/category/${slug}/`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategoryData(slug);
  const PUBLIC_URL = 'https://www.newstropy.online';

  if (!category) {
    return {
      title: 'Category Not Found - Newstropy',
      description: 'The requested category could not be found'
    };
  }

  return {
    title: category.category?.name || 'Category - Newstropy',
    description: category.category?.description || 'News category page',
    alternates: {
      canonical: `${PUBLIC_URL}/category/${slug}`,
    }
  };
}

export default async function CategoryPageWrapper({ params }) {
  const { slug } = params;
  const categoryData = await getCategoryData(slug);

  if (!categoryData) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">{categoryData.category.name}</h1>
      {/* Add your category content rendering here */}
    </div>
  );
}
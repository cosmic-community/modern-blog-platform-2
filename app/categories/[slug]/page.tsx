// app/categories/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cosmic, safeCosmicCall, safeCosmicCallSingle } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostGrid from '@/components/PostGrid'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string): Promise<Category | null> {
  return safeCosmicCallSingle(() =>
    cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
  );
}

async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  return safeCosmicCall(() =>
    cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
  );
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.metadata.name} - Blog Category`,
    description: category.metadata.description || `Posts in the ${category.metadata.name} category`,
    keywords: `${category.metadata.name}, blog, articles`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <header className="mb-12">
        <div className="mb-4">
          <CategoryBadge category={category} />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {category.metadata.name}
        </h1>
        
        {category.metadata.description && (
          <p className="text-xl text-gray-600 max-w-2xl">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Posts in {category.metadata.name} ({posts.length})
        </h2>
        
        {posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
import { cosmic, safeCosmicCall } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostGrid from '@/components/PostGrid'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'

async function getPosts(): Promise<Post[]> {
  return safeCosmicCall(() =>
    cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
  );
}

async function getCategories(): Promise<Category[]> {
  return safeCosmicCall(() =>
    cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
  );
}

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  const featuredPost = posts.find(post => post.metadata.featured);
  const regularPosts = posts.filter(post => !post.metadata.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Modern Blog Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights on technology, productivity, and business strategy from our expert writers.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Post</h2>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Category Filter */}
      <section className="mb-8">
        <CategoryFilter categories={categories} />
      </section>

      {/* Posts Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Posts</h2>
        <PostGrid posts={regularPosts} />
      </section>
    </div>
  )
}
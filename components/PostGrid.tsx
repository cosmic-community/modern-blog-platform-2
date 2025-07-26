import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          {/* Featured Image */}
          {post.metadata.featured_image && (
            <Link href={`/posts/${post.slug}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=600&h=338&fit=crop&auto=format,compress`}
                  alt={post.title}
                  width={600}
                  height={338}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          )}

          <div className="p-6">
            {/* Category */}
            <div className="mb-3">
              <CategoryBadge category={post.metadata.category} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h3>

            {/* Excerpt */}
            {post.metadata.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.metadata.excerpt}
              </p>
            )}

            {/* Author and Date */}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {post.metadata.author?.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-700">
                  {post.metadata.author?.metadata?.name || 'Unknown Author'}
                </p>
                <p>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
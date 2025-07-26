import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        {post.metadata.featured_image && (
          <Link href={`/posts/${post.slug}`}>
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Category */}
          <div className="mb-4">
            <CategoryBadge category={post.metadata.category} />
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {post.metadata.excerpt && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-6">
            {post.metadata.author?.metadata?.avatar && (
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {post.metadata.author?.metadata?.name || 'Unknown Author'}
              </p>
              <p className="text-gray-500">
                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors w-fit"
          >
            Read Full Article
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
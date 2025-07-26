// app/posts/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cosmic, safeCosmicCallSingle } from '@/lib/cosmic'
import { Post } from '@/types'
import PostContent from '@/components/PostContent'
import AuthorBio from '@/components/AuthorBio'
import CategoryBadge from '@/components/CategoryBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  return await safeCosmicCallSingle(async () =>
    await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.metadata.excerpt || 'Read this post on our blog',
    keywords: post.metadata.tags || '',
    authors: [{ name: post.metadata.author?.metadata?.name || 'Unknown Author' }],
    openGraph: {
      title: post.title,
      description: post.metadata.excerpt || 'Read this post on our blog',
      type: 'article',
      images: post.metadata.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Post Header */}
      <header className="mb-8">
        <div className="mb-4">
          <CategoryBadge category={post.metadata.category} />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">
          {post.title}
        </h1>
        
        {post.metadata.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-200">
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
            <p className="font-medium text-gray-900">
              {post.metadata.author?.metadata?.name || 'Unknown Author'}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="mb-12">
        <PostContent content={post.metadata.content} />
      </div>

      {/* Tags */}
      {post.metadata.tags && (
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.metadata.author && (
        <AuthorBio author={post.metadata.author} />
      )}
    </article>
  );
}
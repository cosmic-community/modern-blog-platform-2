// app/authors/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cosmic, safeCosmicCall, safeCosmicCallSingle } from '@/lib/cosmic'
import { Post, Author } from '@/types'
import PostGrid from '@/components/PostGrid'
import AuthorBio from '@/components/AuthorBio'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

async function getAuthor(slug: string): Promise<Author | null> {
  return safeCosmicCallSingle(() =>
    cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
  );
}

async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  return safeCosmicCall(() =>
    cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
  );
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.metadata.name} - Blog Author`,
    description: author.metadata.bio || `Posts by ${author.metadata.name}`,
    keywords: `${author.metadata.name}, author, blog, articles`,
    authors: [{ name: author.metadata.name }],
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Author Header */}
      <header className="mb-12">
        <AuthorBio author={author} showFullBio={true} />
      </header>

      {/* Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Posts by {author.metadata.name} ({posts.length})
        </h2>
        
        {posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found for this author yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
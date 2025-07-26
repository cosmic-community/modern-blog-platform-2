# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/a94eebe0-69ee-11f0-a051-23c10f41277a-photo-1677442136019-21780ecad995-1753513421095.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 15 and powered by Cosmic. This application showcases your blog content with a clean, professional design that emphasizes readability and user experience.

## ✨ Features

- **Dynamic Content Management** - Seamlessly displays posts, authors, and categories from Cosmic
- **Advanced Filtering** - Filter posts by category with real-time updates
- **Author Profiles** - Dedicated author pages with bio, social links, and post listings
- **Featured Post System** - Highlight important content with featured post functionality
- **SEO Optimization** - Built-in meta tags and structured data
- **Responsive Design** - Perfect experience across all devices
- **Rich Text Content** - Full HTML content rendering with proper typography
- **Image Optimization** - Automatic image optimization using imgix

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68847d60240122c53075160f&clone_repository=688480d8240122c53075162a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React** - User interface library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd modern-blog-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get posts by category
const techPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': 'category-id-here'
  })
  .depth(1)
```

### Fetching Authors
```typescript
// Get all authors
const authors = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get specific author
const author = await cosmic.objects
  .findOne({ 
    type: 'authors',
    slug: 'author-slug'
  })
```

## 🎨 Cosmic CMS Integration

This application integrates with your Cosmic bucket to provide:

- **Posts**: Full blog posts with rich HTML content, excerpts, featured images, author relationships, category relationships, tags, and featured status
- **Authors**: Author profiles with names, bios, avatars, email addresses, and social media links
- **Categories**: Content categories with names, descriptions, and custom colors for visual organization

The app uses the Cosmic staging environment as requested and implements proper error handling for missing content.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on git push

### Netlify
1. Connect your repository to Netlify  
2. Add environment variables in the Netlify dashboard
3. Deploy automatically on git push

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

<!-- README_END -->
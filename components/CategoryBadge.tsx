import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  linked?: boolean
}

export default function CategoryBadge({ category, linked = true }: CategoryBadgeProps) {
  const badgeContent = (
    <span
      className="category-badge text-white"
      style={{ backgroundColor: category.metadata.color || '#6B7280' }}
    >
      {category.metadata.name}
    </span>
  )

  if (linked) {
    return (
      <Link href={`/categories/${category.slug}`} className="hover:opacity-80 transition-opacity">
        {badgeContent}
      </Link>
    )
  }

  return badgeContent
}
'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    
    // Filter posts on the page (this is a basic implementation)
    // In a more advanced version, you could use URL params and server-side filtering
    const postElements = document.querySelectorAll('[data-category]')
    
    postElements.forEach(element => {
      const postCategory = element.getAttribute('data-category')
      if (categorySlug === 'all' || postCategory === categorySlug) {
        (element as HTMLElement).style.display = 'block'
      } else {
        (element as HTMLElement).style.display = 'none'
      }
    })
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <span className="text-sm font-medium text-gray-700">Filter by category:</span>
      
      <button
        onClick={() => handleCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`transition-opacity ${
            selectedCategory === category.slug ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <CategoryBadge category={category} />
        </button>
      ))}
    </div>
  )
}
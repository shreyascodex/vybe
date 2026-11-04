import { CATEGORIES } from '../../types'
import type { Category } from '../../types'

export type CategoryValue = Category | 'All'

interface CategoryFilterProps {
  value: CategoryValue
  onChange: (value: CategoryValue) => void
}

const options: CategoryValue[] = ['All', ...CATEGORIES]

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
              active
                ? 'border-ink bg-ink text-paper'
                : 'border-ink/20 text-ink/70 hover:border-ink hover:text-ink'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

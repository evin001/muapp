import { useMemo } from 'react'

import { useSelector } from './useSelector'

export const useCategoryOptions = () => {
  const { categories } = useSelector((state) => ({
    categories: state.entities.categories.data,
  }))

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        text: category.name,
        value: category.id,
      })),
    [categories.length],
  )

  return categoryOptions
}

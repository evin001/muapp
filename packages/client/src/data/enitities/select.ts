import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

export const selectCategoriesWithParent = createSelector(
  [(state: RootState) => state.entities.categories.data],
  (categories) => categories.filter((category) => category.type === 'parent'),
)

export const selectCategoriesWithFreeChild = createSelector(
  [(state: RootState) => state.entities.categories.data],
  (categories) =>
    categories.filter((category) => ['free', 'child'].includes(category.type)),
)

export const selectCategoriesWithFreeParent = createSelector(
  [(state: RootState) => state.entities.categories.data],
  (categories) =>
    categories.filter((category) => ['free', 'parent'].includes(category.type)),
)

export const selectServicesByParentCategory = createSelector(
  [
    (state: RootState) => state.entities.services.data,
    (state: RootState) => state.entities.categories.data,
  ],
  (services, categories) => {
    let parentId: number
    return services.flatMap((service) => {
      const data = []
      if (service.category.parentId && parentId !== service.category.parentId) {
        parentId = service.category.parentId
        data.push(categories.find((c) => c.id === parentId))
      }
      return [...data, service]
    })
  },
)

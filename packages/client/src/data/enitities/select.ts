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

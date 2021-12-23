import store, { EntitiesStore } from '../store'

import request from '~/requests/request'

export const EnititiesActions = {
  async categoriesFetch() {
    const { fetch } = store.getState().entities.categories
    if (fetch === 'pending') {
      return false
    }

    try {
      EntitiesStore.categoriesFetch()
      const categories = await request('categories')
      EntitiesStore.categoriesResolve(categories)
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.categoriesReject(error.message)
    }
  },

  async categoryCreate({
    name,
    parentId,
    callback,
  }: {
    name: string
    parentId?: number
    callback?: () => void
  }) {
    try {
      EntitiesStore.mutationPending(true)
      await request('categoryCreate', { name, parentId })
      await EnititiesActions.categoriesFetch()
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.mutationReject(error.message)
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },
}

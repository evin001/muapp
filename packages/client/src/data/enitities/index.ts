import store, { EntitiesStore } from '../store'

import {
  MutationServiceCreateArgs,
  MutationCategoryCreateArgs,
} from '~/generated/graphql'
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

  async categoryCreate(input: MutationCategoryCreateArgs, callback: () => void) {
    try {
      EntitiesStore.mutationPending(true)
      await request('categoryCreate', input)
      await EnititiesActions.categoriesFetch()
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.mutationReject(error.message)
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },

  async serviceCreate(input: MutationServiceCreateArgs) {
    try {
      EntitiesStore.mutationPending(true)
      const service = await request('serviceCreate', input)
      return service
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.mutationReject(error.message)
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },

  async serviceFetch(id: number) {
    try {
      EntitiesStore.mutationPending(true)
      const service = await request('service', { id })
      return service
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.mutationReject(error.message)
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },
}

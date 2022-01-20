import store, { EntitiesStore } from '../store'

import {
  MutationServiceCreateArgs,
  MutationCategoryCreateArgs,
  MutationServiceUpdateArgs,
} from '~/generated/graphql'
import request from '~/requests/request'
import notify from '~/utils/notify'

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

  async serviceUpdate(input: MutationServiceUpdateArgs, callback?: () => void) {
    try {
      EntitiesStore.mutationPending(true)
      await request('serviceUpdate', input)
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      notify('Обновление услуги', error.message, 'error')
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },

  async serviceCreate(input: MutationServiceCreateArgs, callback?: () => void) {
    try {
      EntitiesStore.mutationPending(true)
      await request('serviceCreate', input)
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      notify('Создание услуги', error.message, 'error')
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
      notify('Ошибка!', error.message, 'error')
    } finally {
      EntitiesStore.mutationPending(false)
    }
  },

  async servicesFetch() {
    try {
      const { user } = store.getState()
      if (!user.data?.id) {
        return
      }

      EntitiesStore.servicesFetch()
      const services = await request('services', { userId: +user.data.id })
      EntitiesStore.servicesResolve(services)
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.servicesReject(error.message)
    }
  },

  async serviceDelete(serviceId: number) {
    try {
      await request('serviceDelete', { serviceId })
      await EnititiesActions.servicesFetch()
    } catch (e) {
      const error = <RequestError>e
      notify('Удаление услуги', error.message, 'error')
    }
  },
}

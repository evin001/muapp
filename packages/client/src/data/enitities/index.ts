import { EntitiesStore } from '../store'

import request from '~/requests/request'

export const EnititiesActions = {
  async categoryCreate(name: string, parentId?: number) {
    try {
      EntitiesStore.categoriesFetch()
      const category = await request('categoryCreate', { name, parentId })
      EntitiesStore.categoriesResolve([category])
    } catch (e) {
      const error = <RequestError>e
      EntitiesStore.categoriesReject(error.message)
    }
  },

  categoriesClear() {
    EntitiesStore.categoriesClear()
  },
}

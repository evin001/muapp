import { combineReducers, configureStore, bindActionCreators } from '@reduxjs/toolkit'

import user from './user/slice'
import entities from './enitities/slice'
import schedule from './schedule/slice'

export type RootState = ReturnType<typeof combineReducer>

const combineReducer = combineReducers({
  user: user.reducer,
  entities: entities.reducer,
  schedule: schedule.reducer,
})

const store = configureStore({
  reducer: combineReducer,
})

export const UserStore = bindActionCreators(user.actions, store.dispatch)
export const EntitiesStore = bindActionCreators(entities.actions, store.dispatch)
export const ScheduleStore = bindActionCreators(schedule.actions, store.dispatch)

export default store

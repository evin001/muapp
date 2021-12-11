import { combineReducers, configureStore, bindActionCreators } from '@reduxjs/toolkit'

import user from './user/slice'

export type RootState = ReturnType<typeof combineReducer>

const combineReducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({
  reducer: combineReducer,
})

export const UserStore = bindActionCreators(user.actions, store.dispatch)

export default store

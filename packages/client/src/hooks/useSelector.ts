import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'

import { RootState } from '~/data/store'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

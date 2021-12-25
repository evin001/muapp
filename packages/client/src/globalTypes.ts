declare global {
  type LoadingState = 'idle' | 'resolved' | 'rejected' | 'pending'

  type RequestError = {
    message: string
  }

  type StoreFetchState<T> = {
    fetch: LoadingState
    data: T
    error: string
  }
}

export default global

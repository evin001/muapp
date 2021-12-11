declare global {
  type LoadingState = 'idle' | 'resolved' | 'rejected' | 'pending'

  type RequestError = {
    message: string
  }
}

export default global

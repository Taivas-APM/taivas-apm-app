export function url (state) {
  return state.url
}
export function isLoggedIn (state) {
  return !!state.token
}
export function backendName (state) {
  if (!state.url) {
    return ''
  }
  const url = new URL(state.url)
  return url.host
}

export function setUrl (state, url) {
  state.url = url
}

export function setToken (state, token) {
  state.token = token
}

export function logout (state) {
  state.token = null
  state.email = null
  state.url = null
}

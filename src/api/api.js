const api = {
  get (url) {
    const headers = this.getDefaultHeaders()
    return new Promise((resolve, reject) => {
      fetch(this.getURL(url), {
        headers,
        method: 'GET',
      }).then(
        (response) => {
          if (!response.ok) {
            response
              .json()
              .then((responseData) => {
                let message = null
                if (typeof responseData.message !== 'undefined') {
                  message = responseData.message
                }
                reject({
                  status: response.status,
                  message: message,
                })
              })
              .catch(reject)
            return
          }
          response
            .json()
            .then(resolve)
            .catch(reject)
        },
        reject,
      )
    })
  },
  post (url, body) {
    if (this.store.getters.isOffline) {
      return Promise.reject()
    }

    const headers = this.getDefaultHeaders()
    headers['Content-Type'] = 'application/json'
    return new Promise((resolve, reject) => {
      fetch(api.getURL(url), {
        body: JSON.stringify(body),
        headers,
        method: 'POST',
      }).then(
        (response) => {
          if (!response.ok) {
            response
              .json()
              .then((responseData) => {
                console.log(response)
                let message = null
                if (typeof responseData.message !== 'undefined') {
                  message = responseData.message
                }
                reject({
                  status: response.status,
                  message: message,
                })
              })
              .catch(reject)
            return
          }
          response
            .json()
            .then(resolve)
            .catch(reject)
        },
        reject,
      )
    })
  },
  handleResponseError (response) {
    if (response.status === 403) {
      this.router.push('/auth/login')
    }
  },
  handleResultMeta (meta) {
    if (meta.token) {
      this.setToken(meta.token)
    }
  },
  getURL (path, params) {
    let parsedParams = ''
    if (typeof params !== 'undefined' && Object.keys(params).length > 0) {
      parsedParams += '?'
      parsedParams = Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
    }
    return this.store.getters['auth/url'] + path + parsedParams
  },
  getDefaultHeaders () {
    const headers = {
      Accept: 'application/json',
      ...this.getAuthHeader(),
      ...this.getAPIVersionHeader(),
    }
    return headers
  },
  getAuthHeader () {
    if (this.getToken()) {
      return { Authorization: `Bearer ${this.getToken()}` }
    }
    return {}
  },
  getAPIVersionHeader () {
    return { 'X-API-VERSION': '1.0.0' }
  },
  getToken () {
    return this.store.state.auth.token
  },
  setStore (store) {
    this.store = store
  },
  setRouter (router) {
    this.router = router
  },
}

export default api

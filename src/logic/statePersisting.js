const localStoragePrefix = 'vuex-persist-'

const persistedModules = [
  'auth',
]

function getLocalStorageKey (moduleName) {
  return localStoragePrefix + moduleName
}

/**
 * Fetches the saved state for the given module from localstorage
 *
 * @param {string} moduleName
 */
export function getPersistedState (moduleName) {
  const localStorageKey = getLocalStorageKey(moduleName)
  const data = window.localStorage.getItem(localStorageKey)
  if (data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return {}
    }
  }
  return {}
}

/**
 * Saves the given state to localstorage
 *
 * @param {string} moduleName
 * @param {Object} data
 */
export function persistState (moduleName, data) {
  const localStorageKey = getLocalStorageKey(moduleName)
  let jsonData = ''
  try {
    jsonData = JSON.stringify(data)
  } catch (e) {
    return
  }
  localStorage.setItem(localStorageKey, jsonData)
}

function getModule (mutation) {
  const split = mutation.type.split('/')
  if (split.length === 1) {
    return null
  }
  return split[0]
}

function shouldSyncModule (module) {
  return persistedModules.indexOf(module) !== -1
}

export function statePersistVuexPlugin (store) {
  store.subscribe((mutation, state) => {
    const module = getModule(mutation)
    if (shouldSyncModule(module)) {
      persistState(module, state[module])
    }
  })
}

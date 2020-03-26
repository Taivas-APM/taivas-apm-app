import deepmerge from 'deepmerge'
import { getPersistedState } from 'src/logic/statePersisting'

export default function () {
  const defaultState = {
    token: null,
    email: null,
    url: null,
  }

  const persistedState = getPersistedState('auth')

  return deepmerge(defaultState, persistedState)
}

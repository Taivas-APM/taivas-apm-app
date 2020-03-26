import Vue from 'vue'
import Vuex from 'vuex'
import { statePersistVuexPlugin } from 'src/logic/statePersisting'

import auth from './auth'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth,
    },
    plugins: [
      statePersistVuexPlugin,
    ],
    strict: process.env.DEV,
  })

  return Store
}

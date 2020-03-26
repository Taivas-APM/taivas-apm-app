import api from 'src/api/api'

export default ({ store, router }) => {
  api.setStore(store)
  api.setRouter(router)
}

import api from 'src/api/api'

export default {
  login: (email, password) => api.post('/auth/login', { email, password }),
}

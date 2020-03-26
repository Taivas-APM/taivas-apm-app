import api from 'src/api/api'

export default {
  requests: () => api.get('/requests'),
  getRequest: (requestId) => api.get('/requests/' + requestId),
  requestHistory: (requestId) => api.get('/requests/' + requestId + '/history'),
}

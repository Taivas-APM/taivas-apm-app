import api from 'src/api/api'

export default {
  recentRequests: () => api.get('/analytics/recent-requests'),
  lastRequests: () => api.get('/analytics/last-requests'),
  longestRequests: () => api.get('/analytics/longest-requests'),
}

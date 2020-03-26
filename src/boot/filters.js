export default ({ Vue }) => {
  Vue.filter('formatData', (data, type) => {
    if (type === 'memory_peak') {
      return Math.round(data / 1024 / 1024) + ' MB'
    }
    if (type === 'db_duration' || type === 'request_duration') {
      return Math.round(data) + ' ms'
    }
    return data
  })
}

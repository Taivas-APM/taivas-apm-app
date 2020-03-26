<template>
  <q-page class="q-pa-lg main-bg">
    <RequestsByUrl />
  </q-page>
</template>

<script>
import RequestsByUrl from 'src/components/analytics/RequestsByUrl'

export default {
  name: 'PageRequests',
  components: {
    RequestsByUrl,
  },
}
</script>

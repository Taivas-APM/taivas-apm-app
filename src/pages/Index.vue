<template>
  <q-page class="q-pa-lg main-bg">
    <div class="row fit q-mb-md q-gutter-lg">
      <div class="col">
        <RecentRequests class="main-graph" />
      </div>
    </div>
    <div class="fit q-gutter-lg row no-wrap items-start">
      <div class="col">
        <LastRequests />
      </div>
      <div class="col">
        <LongestRequests />
      </div>
    </div>
  </q-page>
</template>

<script>
import RecentRequests from 'src/components/analytics/RecentRequests'
import LastRequests from 'src/components/analytics/LastRequests'
import LongestRequests from 'src/components/analytics/LongestRequests'

export default {
  name: 'PageIndex',
  components: {
    RecentRequests,
    LastRequests,
    LongestRequests,
  },
}
</script>

<style lang="scss" scoped>
  .main-graph {
    height: 400px;
  }

  .main-bg {
    background: #121212;
  }
</style>

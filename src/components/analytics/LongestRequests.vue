<template>
  <q-table
    title="Longest requests (last 24h)"
    row-key="id"
    @row-click="openRequest"
    :columns="columns"
    :data="data"
    :pagination.sync="pagination"
    hide-bottom />
</template>

<script>
import AnalyticsApi from 'src/api/analyticsApi'

export default {
  name: 'LastRequests',
  data () {
    return {
      pagination: {
        rowsPerPage: 10,
      },
      data: [],
      columns: [
        {
          name: 'url',
          label: 'URL',
          field: 'url',
          sortable: false,
          align: 'left',
        },
        {
          name: 'request_duration_avg',
          label: 'Avg Request Duration',
          field: 'request_duration_avg',
          format: val => this.$options.filters.formatData(val, 'request_duration'),
          sortable: false,
        },
        {
          name: 'db_duration_avg',
          label: 'Avg DB Duration',
          field: 'db_duration_avg',
          format: val => this.$options.filters.formatData(val, 'db_duration'),
          sortable: false,
        },
        {
          name: 'memory_peak_avg',
          label: 'Avg Memory',
          field: 'memory_peak_avg',
          format: val => this.$options.filters.formatData(val, 'memory_peak'),
          sortable: false,
        },
      ],
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      AnalyticsApi.longestRequests().then(data => {
        this.data = data.longestRequests
      })
    },
    openRequest (event, request) {
      this.$router.push('/request/' + request.id)
    },
  },
}
</script>

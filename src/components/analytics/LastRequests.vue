<template>
  <q-table
    title="Last requests"
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
          align: 'left',
          sortable: false,
          field: 'url',
        },
        {
          name: 'started_at',
          label: 'Date',
          sortable: false,
          format: val => this.$options.filters.formatData(val, 'started_at'),
          field: 'started_at',
        },
        {
          name: 'request_duration',
          label: 'Request Duration',
          sortable: false,
          format: val => this.$options.filters.formatData(val, 'request_duration'),
          field: 'request_duration',
        },
        {
          name: 'db_duration',
          label: 'DB Duration',
          sortable: false,
          format: val => this.$options.filters.formatData(val, 'db_duration'),
          field: 'db_duration',
        },
        {
          name: 'memory_peak',
          label: 'Memory',
          sortable: false,
          format: val => this.$options.filters.formatData(val, 'memory_peak'),
          field: 'memory_peak',
        },
      ],
      refreshInterval: null,
    }
  },
  created () {
    this.loadData()
    this.refreshInterval = window.setInterval(this.loadData, 2000)
  },
  beforeDestroy () {
    if (this.refreshInterval) {
      window.clearInterval(this.refreshInterval)
    }
  },
  methods: {
    loadData () {
      AnalyticsApi.lastRequests().then(data => {
        this.data = data.lastRequests
      })
    },
    openRequest (event, request) {
      this.$router.push('/request/' + request.id)
    },
  },
}
</script>

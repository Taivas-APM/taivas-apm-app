<template>
  <q-table
    title="Requests by URL (last 24h)"
    row-key="id"
    @row-click="openRequest"
    :columns="columns"
    :data="data"
    :pagination.sync="pagination"
    />
</template>

<script>
import RequestApi from 'src/api/requestApi'

export default {
  name: 'LastRequests',
  data () {
    return {
      pagination: {
        rowsPerPage: 100,
      },
      data: [],
      columns: [
        {
          name: 'url',
          label: 'URL',
          field: 'url',
          sortable: true,
          align: 'left',
        },
        {
          name: 'request_duration_avg',
          label: 'Avg Request Duration',
          field: 'request_duration_avg',
          format: val => this.$options.filters.formatData(val, 'request_duration'),
          sortable: true,
        },
        {
          name: 'db_duration_avg',
          label: 'Avg DB Duration',
          field: 'db_duration_avg',
          format: val => this.$options.filters.formatData(val, 'db_duration'),
          sortable: true,
        },
        {
          name: 'memory_peak_avg',
          label: 'Avg Memory',
          field: 'memory_peak_avg',
          format: val => this.$options.filters.formatData(val, 'memory_peak'),
          sortable: true,
        },
        {
          name: 'request_sum',
          label: 'Request count',
          field: 'request_sum',
          sortable: true,
        },
      ],
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      RequestApi.requests().then(data => {
        this.data = data.requests
      })
    },
    openRequest (event, request) {
      this.$router.push('/request/' + request.id)
    },
  },
}
</script>

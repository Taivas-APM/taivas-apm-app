<template>
  <div>
    <div v-if="request" class="header bg-grey-10">
      <div class="header-content">
        <div class="text-subtitle1 text-grey-7 q-mb-md">
          {{ request.url }}
        </div>
        <div class="row">
          <div class="col-6 col-md-3">
            <div class="text-h4">{{ request.request_duration | formatData('request_duration') }}</div>
            <div class="text-caption text-grey-7">Request duration</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h4">{{ request.db_duration | formatData('db_duration') }}</div>
            <div class="text-caption text-grey-7">Database duration</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h4">{{ request.db_queries.length }}</div>
            <div class="text-caption text-grey-7">{{ request.db_queries.length === 1 ? 'Database query' : 'Database queries' }}</div>
          </div>
          <div class="col-6 col-md-3">
            <div class="text-h4">{{ request.memory_peak | formatData('memory_peak') }}</div>
            <div class="text-caption text-grey-7">Memory usage</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="row content-stretch q-col-gutter-lg">
        <div class="col-12 col-md-8">
          <History :request-id="$route.params.id" />
        </div>
        <div class="col-12 col-md-4 self-stretch">
          <q-card class="bg-primary column" style="height: 100%">
            <q-card-section class="col-auto">
              Performance Recommendations
            </q-card-section>
            <q-card-section class="col fit row justify-center content-center">
              <div class="col" style="color: rgba(255, 255, 255, 0.5);text-align: center;">
                <q-icon
                  name="thumb_up"
                  style="font-size: 100px" />
                <br>
                All good
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-table
        class="q-mt-lg"
        v-if="request && request.db_queries.length"
        title="Database queries"
        :data="queries"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10, 30, 100]"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>

<script>
import RequestApi from 'src/api/requestApi'
import History from 'src/components/request/History'

export default {
  data () {
    return {
      request: null,
      pagination: {
        rowsPerPage: 10,
      },
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
          sortable: true,
          style: 'max-width: 10px',
        },
        {
          name: 'query',
          label: 'Query',
          field: 'query',
          align: 'left',
          sortable: true,
        },
        {
          name: 'time',
          label: 'Duration',
          format: val => `${val} ms`,
          field: 'time',
          sortable: true,
        },
      ],
    }
  },
  created () {
    RequestApi.getRequest(this.$route.params.id).then(data => {
      this.request = data.request
    })
  },
  computed: {
    queries () {
      if (!this.request) {
        return []
      }
      return this.request.db_queries.map((query, idx) => {
        return {
          id: idx,
          ...query,
        }
      })
    },
  },
  components: {
    History,
  },
}
</script>

<style lang="scss" scoped>
  .header {
    padding-bottom: 100px;
    padding-top: 10px;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .main-content {
    max-width: 1400px;
    margin: -50px auto 0 auto;
  }
</style>

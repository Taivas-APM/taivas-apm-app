<template>
  <vue-plotly style="height: 380px" :data="data" :layout="layout" :options="options"/>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'
import RequestApi from 'src/api/requestApi'

export default {
  props: ['requestId'],
  data () {
    return {
      data: [],
      layout: {
        title: 'Last 30 days',
        barmode: 'stack',
        height: 380,
        plot_bgcolor: '#1D1D1D',
        paper_bgcolor: '#1D1D1D',
        legend: {
          font: {
            color: '#dddddd',
          },
          orientation: 'h',
        },
        xaxis: {
          type: 'date',
          zerolinecolor: '#9E9E9E',

          gridcolor: '#2f2f2f',

          titlefont: {
            color: '#dddddd',
            size: 12,
          },

          tickfont: {
            color: '#757575',
            size: 12,
          },

          showgrid: false,
        },
        yaxis: {
          title: {
            text: 'Avg Duration (ms)',
          },
          zerolinecolor: '#9E9E9E',

          gridcolor: '#2f2f2f',

          titlefont: {
            size: 12,
          },

          tickfont: {
            color: '#757575',
            size: 12,
          },
        },
        yaxis2: {
          title: 'Avg Memory Usage (MB)',
          overlaying: 'y',
          side: 'right',
          titlefont: {
            size: 12,
          },

          tickfont: {
            color: '#757575',
            size: 12,
          },
        },
        colorway: ['#ef8830', '#4fb8fb', '#54fc86'],
      },
      options: {
        displaylogo: false,
        responsive: true,
      },
    }
  },
  created () {
    RequestApi.requestHistory(this.requestId).then(data => {
      this.data = this.formatData(data.recentRequests)
    })
  },
  methods: {
    formatData (recentRequests) {
      const traces = []
      const keys = {
        request_duration_avg: 'Request duration',
        db_duration_avg: 'DB duration',
        memory_peak_avg: 'Memory usage',
      }
      Object.keys(keys).forEach(key => {
        traces.push({
          y: [],
          x: [],
          type: 'scatter',
          mode: 'line',
        })
      })
      Object.values(recentRequests).forEach(request => {
        Object.keys(keys).forEach((key, idx) => {
          traces[idx].x.push(request.started_at_date)
          traces[idx].y.push(parseInt(request[key]))
          traces[idx].name = keys[key]
          if (key === 'memory_peak_avg') {
            traces[idx].yaxis = 'y2'
          }
        })
      })
      return traces
    },
  },
  components: {
    VuePlotly,
  },
}
</script>

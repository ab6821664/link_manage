<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
  import echarts from 'echarts'
  import tdTheme from './theme.json'
  import {on, off} from '@/libs/tools'

  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'ChartLine',
    props: {
      value: Object,
      text: String,
      subtext: String
    },
    data() {
      return {
        dom: null
      }
    },
    methods: {
      resize() {
        this.dom.resize()
      }
    },
    mounted() {
      console.log(111)
      this.$nextTick(() => {
        console.log(this.value)
        let xAxisData = this.value.xAxis
        let series = []
          let legent = []
        let data = this.value.seriesData
        for (let i = 0; i < data.length; i++) {
          console.log(i)
          let params = {}
          params.type = 'line'
          params.name = data[i].name
          legent.push( params.name);
          params.data = data[i].data
          series.push(params)
        }
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'left'
          },
          legend: {
            data:legent
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: series
        }
        console.log(option)
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    },
    beforeDestroy() {
      off(window, 'resize', this.resize)
    }
  }
</script>

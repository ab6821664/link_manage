<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`"
             style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-line style="height: 300px;" :value="lineData" text="点击次数统计"></chart-line>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="客户端点击百分比"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
  import InforCard from '_c/info-card'
  import CountTo from '_c/count-to'
  import {ChartBar} from '_c/charts'
  import ChartLine from '_c/charts/line.vue'
  import Example from './example.vue'
  import { test } from '@/api/data'

  export default {
    name: 'home',
    components: {
      InforCard,
      CountTo,
      ChartLine,
      ChartBar,
      Example
    },
    data() {
      return {
        inforCardData: [
          {title: '分类数量', icon: 'ios-list-box', count: 13, color: '#2d8cf0'},
          {title: '链接数量', icon: 'ios-link-outline', count: 232, color: '#19be6b'},
          {title: '总点击数', icon: 'md-link', count: 1420, color: '#ff9900'},
          {title: '最近点击时间距今天数', icon: 'ios-clock-outline', count: 3, color: '#ed3f14'},
        ],
        lineData: {
          legend:[],
          xAxis: ['8-22', '8-22', '8-22', '8-22', '8-22', '8-22'],
          seriesData: [
            {
              name: '总点击量',
              data: [20, 12, 15, 25, 36, 50]
            },
            {
              name: '单独点击量',
              data: [2, 10, 1, 5, 6, 20]
            }]
        },
        barData: {
          "手机端": 80,
          "电脑端": 20
        }
      }
    },
    mounted() {
      console.log(55)
      test({userId:116}).then((res)=>{
        console.log(res)
      })
    }
  }
</script>

<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>

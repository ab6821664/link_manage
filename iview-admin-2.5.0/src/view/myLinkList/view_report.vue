<template>
    <div id="link-view-report">
      <div style="display: flex;justify-content: space-between;font-size: 15px">
        <div class="title">
          <span>2-step Brand URL-2 Lm</span> <br/><br>
          <span>Previoue Link</span>
        </div>
        <div>
          <span class="link"><Icon type="ios-link" style="color: #000c17;font-size: 20px"></Icon> http://pixelfy.me/M1CCPP </span><Button type="primary" size="small">Copy</Button>
          <Button type="primary" size="small" style="margin-left: 8px">Edit URL</Button><br/><br>
            <span class="title">2019 Aug 14:08:22 pm</span>
        </div>
        <div>
           <span>Action</span><br/><br>
          <i-switch v-model="switch1" @on-change="change" />
          <Button type="primary" icon="md-apps" style="margin-left: 10px;">QR Code</Button>
          <Button type="success"   style="margin-left: 10px;"><Icon type="ios-create-outline" size="15"></Icon></Button>
          <Button type="error"   style="margin-left: 10px;" ><Icon type="ios-trash-outline" size="15"></Icon></Button>
        </div>
      </div>
      <div style="margin-top: 10px;border-bottom: solid 1px #d2d3d3;padding-bottom: 15px;">
         <span style="background-color: #2d8cf0;color: white;padding: 5px;">2sfTEP BRAND URL</span>
      </div>
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

      </Row>
    </div>

</template>



<script>
  import {ChartBar} from '_c/charts'
  import ChartLine from '_c/charts/line.vue'

    export default {
        name: "view_report",
      components: {
        ChartLine,
        ChartBar,
      },
       data:function () {
         return {
           switch1:true,
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
      mounted(){

      },
      methods:{
        change(){

        }
      }
    }
</script>

<style scoped>

</style>

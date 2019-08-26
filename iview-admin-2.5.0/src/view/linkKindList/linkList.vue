<template xmlns="http://www.w3.org/1999/html">
    <div id="link-list">
      <div class="title">
         <div class="tip">
           My Tracking Links
         </div>
        <div class="tip">
          All
        </div>
        <div>
          <Button type="primary" icon="md-add">Create Tracking Link</Button>
        </div>
      </div>
      <Row justify="space-between" type="flex">
        <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`"
               style="height: 120px;padding-bottom: 10px;">
          <infor-card shadow :color="infor.color"  :icon-size="6" style="height: 120px">
            <count-to :end="infor.count" count-class="count-style"/>
            <p>{{ infor.title }}</p>
          </infor-card>
        </i-col>
      </Row>
      <Row type="flex" style="margin-top: 35px;">
        <i-col :lg="4" offset="1" class="search">
          Search:
        </i-col>
        <i-col :lg="8" style="margin-left: 0px">
          <i-input :value.sync="searchValue" placeholder="Enter the name or type of the link" style="width: 300px"></i-input>
        </i-col>
      </Row>

      <Row  style="margin-top: 35px">
        <i-col span="24" style="background-color: #2d8cf0">
          <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name>0?"√":"×" }}</strong>
            </template>
            <template slot-scope="{ row }" slot="age">
               <div>
                 <span>2-step Brand URL-2LM</span><br/> <span>http:pixelfy/me/Msdsd</span> <br/><span>2STEP URL</span>
               </div>
            </template>
            <template slot-scope="{ row }" slot="target">
              <div>
                <Progress :percent="58"></Progress>
              </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Icon type="ios-create" size="20" color="#2d8cf0"/>
              <Icon type="md-more" size="20" color="#2d8cf0"/>
            </template>
          </Table>
        </i-col>
      </Row>
    </div>
</template>


<script>
  import InforCard from '_c/info-card'
  import CountTo from '_c/count-to'
  import CommonIcon from '_c/common-icon'
    export default {
        name: "linkList",
        components:{
        InforCard,CountTo,CommonIcon
      },
        data() {
           return {
             self: this,
             inforCardData: [
               {title: 'Total Tracking Links ', icon: 'ios-list-box', count: 13, color: '#2d8cf0'},
               {title: 'Total Clicks', icon: 'ios-link-outline', count: 232, color: '#2d8cf0'},
               {title: 'Total Unique Clicks', icon: 'md-link', count: 1420, color: '#2d8cf0'},
               {title: 'Total Non Unique Clicks', icon: 'ios-clock-outline', count: 3, color: '#2d8cf0'},
             ],
             searchValue:"",
             columns12: [
               {
                 title: 'Active',
                 slot: 'name'
               },
               {
                 title: 'TrackingLink',
                 slot: 'age'
               },
               {
                 title: 'Total Clicks',
                 key: 'address'
               },
               {
                 title: 'Unique  Clicks',
                 key: 'unique'
               },
               {
                 title: 'Composition',
                 slot: 'target'
               },
               {
                 title: 'creation   ',
                 key: 'date'
               },
               {
                 title: 'Action',
                 slot: 'action',
                 width: 150,
                 align: 'center',
                 target:30
               }
             ],
             data6: [
               {
                 name: 0,
                 age: 18,
                 address: '50',
                 unique:"8",
                 target:30,
                 date:'2019 Aug 14:08:22 pm'
               },
               {
                 name: 1,
                 age: 24,
                 address: '88',
                 unique:"8",
                 target:30,
                 date:'2019 Aug 14:08:22 pm'
               },
               {
                 name: 1,
                 age: 30,
                 address: '77',
                 unique:"8",
                 target:30,
                 date:'2019 Aug 14:08:22 pm'
               },
               {
                 name: 0,
                 age: 26,
                 address: '89',
                 unique:"8",
                 target:30,
                 date:'2019 Aug 14:08:22 pm'
               }
             ]
           }
        },

      methods: {
        show (index) {
          this.$Modal.info({
            title: '用户信息',
            content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
          })
        },
        remove (index) {
          this.data6.splice(index, 1);
        }
      },
    }
</script>

<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>

<template>
  <div class="main">
    <div class="create-head">
      <span class="title">Create Tracking Link </span> <span class="help">How It works</span>
    </div>
    <div class="create-kind-wrap">
      <span class="create-kind">AMZ Choice URL</span>
    </div>
    <div class="explain">
      打造AMZ Choice标识的超链接
    </div>
    <div class="explain">
      <p>friendly name <Icon type="ios-alert"  style="color: #2d8cf0;font-size: 15px"/> </p>
      <Input v-model="name" style="height: 40px;margin-top: 20px"/>
    </div>
    <div class="explain">
      <p> Configure your tracking link </p>
      <div class="form-msg">
        <div class="row">
          <p class="label-tip">Marketplace</p>
          <div>
            <Select v-model="mode" style="width:45%">
              <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

          </div>
        </div>
        <div class="row" style="display: flex;">
          <div style="width: 50%">
            <span>ASIN</span><br/>
            <Input style="width: 90%"></Input>
          </div>
          <div style="width: 50%">
            <span>keyword</span><br/>
            <Input style="width: 90%"></Input>
          </div>
        </div>

        <div class="row">
          <div style="display: flex;justify-content: space-between;margin-top: 25px">
            <div >
              <span style="font-size: 14px;margin-right: 20px">分类:</span>
              <Select v-model="mode" style="width:300px">
                <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div>
              <template>
                <i-switch v-model="switch1" @on-change="change" /><span style="margin-left: 20px">着陆页开关，是否有着陆页</span>
              </template>

            </div>
          </div>
        </div>
        <div class="row">
          <div style="text-align: center;margin-top: 20px">
            <Button style="width:150px">取消</Button>
            <Button type="primary" style="width:150px;margin-left: 30px">创建链接</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "URL_Rotator",
    data:function () {
      return {
        name:'ddd',
        switch1:'',
        mode:'',
        value6:'',
        modeList:[
          {label:'sd1',value:'sf1'},{label:'sd2',value:'sf2'},{label:'sd3',value:'sf3'},
        ],
        list:[
          {value:null,id:333},{value:null,id:333},{value:null,id:333},{value:null,id:333}
        ]
      }
    },
    methods:{
      //  删除列表元素
      deleteUrl(index){
        console.log(index)
        this.list.splice(index,1);
      },
      // 添加列表url
      addUrl(){
        this.list.push({value:null,id:333})
      },
      change(){

      }
    }
  }
</script>




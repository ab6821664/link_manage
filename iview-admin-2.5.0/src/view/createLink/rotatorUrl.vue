<template>
    <div class="main">
       <div class="create-head">
           <span class="title">Create Tracking Link </span> <span class="help">How It works</span>
       </div>
      <div class="create-kind-wrap">
         <span class="create-kind">URL Rotator</span>
      </div>
      <div class="explain">
        多个超链接依次变换的短链接
      </div>
      <div class="explain">
        <p>friendly name <Icon type="ios-alert"  style="color: #2d8cf0;font-size: 15px"/> </p>
        <Input v-model="name" style="height: 40px;margin-top: 20px"/>
      </div>
      <div class="explain">
        <p> Configure your tracking link </p>
        <div class="form-msg">
           <div class="row">
              <p class="label-tip">Redirect mode</p>
              <div>
                <Select v-model="mode" style="width:95%">
                  <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Icon type="ios-trash" style="font-size: 15px;margin-left: 3%;color: red"/>
              </div>
           </div>
           <div class="row">
             <p class="label-tip">Destination URL 1</p>
             <div>
               <Select v-model="mode" style="width:95%">
                 <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
               <Icon type="ios-trash" style="font-size: 15px;margin-left: 3%;color: red"/>
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
                   <Button type="primary" ghost>Add destination Url <Icon type="md-add" /></Button>
                 </div>
            </div>
          </div>
          <div class="row">
              <div style="text-align: center;margin-top: 20px">
                <Button style="width:150px">取消</Button>
                <Button type="primary" style="width:150px;margin-left: 30px">>确认</Button>
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
           mode:'',
           modeList:[
             {label:'sd',value:'sf'},{label:'sd',value:'sf'},{label:'sd',value:'sf'},
           ]
         }
       }
    }
</script>



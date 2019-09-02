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
                <Select v-model="mode" style="width:100%">
                  <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
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



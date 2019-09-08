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
                <Select v-model="redirectMode" style="width:95%">
                  <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>

              </div>
           </div>
         <!-- redirectUrl 跳转链接  -->
           <div class="row" v-for="(opt,index) in redirectUrl" v-show="opt.show">
             <p class="label-tip">Destination URL {{index+1}}</p>
             <div>
               <Select  style="width:95%"  v-model="opt.value">
                 <Option v-for="(item,dex) in linkList" :value="item.value" :key="item.value+dex">{{ item.label }}</Option>
               </Select>
               <Icon type="ios-trash" style="font-size: 15px;margin-left: 3%;color: red" @click="deleteUrl(index)"/>
             </div>
           </div>

          <div class="row">
            <div style="display: flex;justify-content: space-between;margin-top: 25px">
                <div >
                  <span style="font-size: 14px;margin-right: 20px">分类:</span>
                  <Select  style="width:300px" v-model="categoryId" :filterable="true">
                  <Option v-for="item in catoryList" :value="item.categoryId" :key="item.categoryId">{{ item.name }}</Option>
                   </Select>
                </div>
                 <div>
                   <Button type="primary" ghost @click="addUrl">Add destination Url <Icon type="md-add" /></Button>
                 </div>
            </div>
          </div>
          <div class="row">
              <div style="text-align: center;margin-top: 20px">
                <Button style="width:150px">取消</Button>
                <Button type="primary" style="width:150px;margin-left: 30px" @click="addAndEdit">创建链接</Button>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { addEditLink ,kindList} from '@/api/data'
    export default {
        name: "URL_Rotator",
       data:function () {
         return {
           name:'ddd',
           redirectMode:1,
           modeList:[
             {label:'顺序',value:1},{label:'随机',value:2},
           ],
           linkList:[
             {value:'www.test1.com',label:'www.test1.com',result:''},{value:'www.test2.com',label:'www.test2.com',result:''}  // 链接列表
           ],
           redirectUrl:[{value:'',show:true}],  // 跳转的链接列表
           RoaoteUrlArray:[], // 需要跳转的链接集合
           catoryList:[],
           categoryId:''  //分类ID
         }
       },
      created(){
          this.getCatoryList()
      },
       methods:{
          //  删除列表元素
         deleteUrl(index){
           this.redirectUrl[index].show = false;
         },
         // 添加列表url
         addUrl(){
           this.redirectUrl.push({value:'',show:true})
         },
         // 创建链接
         createLink(){
           console.log(this.redirectUrl)
         },
         // 获取分类列表
          getCatoryList(){
           let params ={
             pageNum:1,
             pageSize:1000
           }
            kindList(params).then((res)=>{
                  if(res.code=='200'){
                    this.catoryList = res.result.list;
                  }
            })
          },
         // 校验
         checkForm(){
            if(this.name.trim().length==0){vbv
              this.$Message.error('链接名字必填');
              return false
            }
           if(!this.categoryId>0){
             this.$Message.error('链接分类必填');
             return false
           }
           this.redirectUrl.map((item)=>{
             if(item.show && item.value.length>0){
               this.RoaoteUrlArray.push(item.value)
             }
           })
           if(this.RoaoteUrlArray.length==0){
             this.$Message.error('需要跳转的链接必填');
             return false
           }
           return  true
         },
         //   创建或者编辑链接
         addAndEdit(){
           if(this.checkForm()){
             return
             let params = {
               likeType:1,
               linkName:this.name.trim(),
               categoryId:this.categoryId,
               redirectUrl:this.catoryList.join(',')
             }
             console.log(params)
           }

         }

       }
    }
</script>



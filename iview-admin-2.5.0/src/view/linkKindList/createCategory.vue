<template>
    <div id="create_campaugn">
       <Row>
         <Col span="24">
           <p class="introduce">
             A campaign is a collection of tracking links, used to track clicks and data for a specific marketing project, It is used in a similar way to how you may use
             a folder on your computer for organizing your desktop.
           </p>
           <p class="introduce">
             For example, if you are launching a new product, you may want to promote the product on multiple channels, such as Facebook Ads and Instagram Influencer
             Campaigns, With Pixelfy.me, you can create separate tracking links for each channel and organize them under a single Campaign folder, so that you can view the reuslr
             of your marketing campaign from one, single place.
           </p>
         </Col>
       </Row>
       <Row style="margin-top: 35px">
         <Col span="18" offset="3">
           <i-form :model="formItem" :label-width="180" label-position="left">
             <Form-item label="Campaign name" required>
               <i-input v-model="formItem.name" placeholder="Your Campaign name"></i-input>
             </Form-item>
             <Form-item label="Notes">
               <i-input v-model="formItem.notes" placeholder="you can add some notes" type="textarea" :rows="6"></i-input>
             </Form-item>
             <Form-item>
               <i-button type="primary" style="width: 120px" @click="confirmBtn">确认</i-button>
               <i-button  style="margin-left: 28px;width: 120px" @click="back" >取消</i-button>
             </Form-item>
           </i-form>
         </Col>
       </Row>
    </div>
</template>

<script>
  import { createKind ,viewCategory, editKind} from '@/api/data'
    export default {
        name: "createCategory",
      data:function () {
        return {
          formItem:{
            name:"",
            notes:""
          }
        }
      },
      created(){
        this.editCategory();
      },
      methods:{
          // 创建分类
        createKind(){
          this.formItem.name = this.formItem.name.trim();
          createKind(this.formItem).then((res)=>{
               if(res.code=='200'){
                 this.$Message.success('创建分类成功');
                 this.formItem=
                   {
                     name:"",
                     notes:""
                   }
               }else {
                 this.$Message.error(res.msg);
               }
          })
        },
        // 编辑分类
         editKind(id){
           if(this.formItem.name.trim().length==0){
             this.$Message.error('分类名字必填');
             return
           }
            let params = this.formItem;
            params.categoryId = id;
           editKind(params).then((res)=>{
             if(res.code=='200'){
               this.$Message.success('修改成功');
             }else {
               this.$Message.error(res.msg);
             }
           })
         },
        //  确认按钮
        confirmBtn(){

          let categoryId = this.$route.query.categoryId;
          if(categoryId){
            this.editKind(categoryId)
          }else {
            this.createKind();
          }
        },
        // 回显信息，编辑状态下
        editCategory(){
          let categoryId = this.$route.query.categoryId;
          let params = {
            categoryId : categoryId
          }
          viewCategory(params).then(res=>{
              if(res.code=='200'){
                this.formItem.name = res.result.name;
                this.formItem.notes = res.result.notes;
              }
          })
        },
        // 取消创建
        back(){
          this.$router.push('/link_kind/my_kind_list')
        }
      }
    }
</script>

<style scoped>

</style>

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
               <i-input :value.sync="formItem.name" placeholder="Your Campaign name"></i-input>
             </Form-item>
             <Form-item label="Notes">
               <i-input :value.sync="formItem.note" placeholder="you can add some notes" type="textarea" :rows="6"></i-input>
             </Form-item>
             <Form-item>
               <i-button type="primary" style="width: 120px">确认</i-button>
               <i-button  style="margin-left: 28px;width: 120px" >取消</i-button>
             </Form-item>
           </i-form>
         </Col>
       </Row>
    </div>
</template>

<script>
    export default {
        name: "createCategory",
      data:function () {
        return {
          formItem:{
            name:"",
            note:""
          }
        }
      }
    }
</script>

<style scoped>

</style>

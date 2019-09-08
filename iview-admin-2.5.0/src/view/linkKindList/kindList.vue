<template>
    <div style="padding: 30px 30px">
      <Row>
         <i-col span="12">
           我的分类
         </i-col>
         <i-col span="12" style="text-align: right">
           <Button type="primary" icon="md-add" @click="addCategory">添加分类</Button>
         </i-col>
      </Row>
      <Row style="margin-top: 25px">
        <Table border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" ><Icon type="ios-eye-outline" size="20"></Icon></Button>
            <Button type="success"   style="margin-left: 10px;" @click="edit(row)"><Icon type="ios-create-outline" size="20"></Icon></Button>
            <Button type="error"   style="margin-left: 10px;" @click="deleteKind(row)"><Icon type="ios-trash-outline" size="20"></Icon></Button>

          </template>
        </Table>
      </Row>
      <div style="display: flex;justify-content: space-between;margin-top: 30px">
        <div>
          <Page :total="total" show-sizer :page-size="kindBean.pageSize" @on-change="changePageList" @on-page-size-change="changeSizeList"/>
        </div>
      </div>
    </div>
</template>

<script>
  import { kindList,deleteKind } from '@/api/data'
    export default {
        name: "kindList",
      data:function () {
        return {
          kindBean:{
            pageNum:1,
            pageSize:10,
            name:''
          },
          total:null,
          columns12: [
            {
              title: '类别名称',
              slot: 'name'
            },
            {
              title: '链接数量',
              key: 'linkNum'
            },
            {
              title: '总点击数',
              key: 'clickNum'
            },
            {
              title: '创建时间',
              key: 'addTime'
            },
            {
              title: '操作',
              slot: 'action',
              width: 230,
              align: 'center'
            }
          ],
          data6: []
        }
      },
      methods: {
        // 获取分类列表
        getList:function(){
          console.log(this.kindBean)
          kindList(this.kindBean).then(res=>{
               if(res.code=='200'){
                 let data = res.result;
                 this.total=parseInt(data.totalRow);
                 this.data6 = data.list;
               }
          })
        },
        // 翻页查询
        changePageList(page){
          this.kindBean.pageNum = page;
          this.getList()
        },
        // 调整页码
        changeSizeList(size){
          this.kindBean.pageNum = 1;
          this.kindBean.pageSize = size;
          this.getList()
        },
        // 删除链接
        deleteKind(row){
          if(row.linkNum>0){
            this.$Message.error('此分类下还存在链接，不允许删除')
            return
          }
          let params ={
            categoryId:row.categoryId
          }
          deleteKind(params).then((res)=>{
              if(res.code=='200'){
                this.$Message.success('删除分类成功');
              }else {
                this.$Message.error(res.msg)
              }
          })
        },
        //  编辑分类
        edit(row){
            let categoryId=row.categoryId;
            console.log(categoryId)
            this.$router.push({
              path:'/link_kind/create_kind',
              query:{
                categoryId
              }
            })
        },
        // 前往添加分类页面
        addCategory(){
          this.$router.push('/link_kind/create_kind')
        }
      },
      created() {
          this.getList();
      }
    }
</script>

<style scoped>

</style>

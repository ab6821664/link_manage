<template>
    <div style="padding: 30px 30px">
      <Row>
         <i-col span="12">
           我的分类
         </i-col>
         <i-col span="12" style="text-align: right">
           <Button type="primary" icon="md-add">添加分类</Button>
         </i-col>
      </Row>
      <Row style="margin-top: 25px">
        <Table border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" ><Icon type="ios-eye-outline" size="20"></Icon></Button>
            <Button type="success"   style="margin-left: 10px;"><Icon type="ios-create-outline" size="20"></Icon></Button>
            <Button type="error"   style="margin-left: 10px;" ><Icon type="ios-trash-outline" size="20"></Icon></Button>

          </template>
        </Table>
      </Row>
      <div style="display: flex;justify-content: space-between;margin-top: 30px">
        <div>
          共三个分类
        </div>
        <div>
          <Page :total="100" show-sizer />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "kindList",
      data:function () {
        return {
          columns12: [
            {
              title: '类别名称',
              slot: 'name'
            },
            {
              title: '链接数量',
              key: 'age'
            },
            {
              title: '总点击数',
              key: 'address'
            },
            {
              title: '创建时间',
              key: 'date'
            },
            {
              title: '操作',
              slot: 'action',
              width: 230,
              align: 'center'
            }
          ],
          data6: [
            {
              name: '分类一',
              age: 18,
              address: 88,
              date:'2019-05-08'
            },
            {
              name: '分类一',
              age: 24,
              address: 88,
              date:'2019-05-08'

            },
            {
              name: '分类一',
              age: 30,
              address: 88,
              date:'2019-05-08'
            },
            {
              name: '分类一',
              age: 26,
              address: 88,
              date:'2019-05-08'
            }
          ]
        }
      },
      methods: {
        show (index) {
          this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
          })
        },
        remove (index) {
          this.data6.splice(index, 1);
        }
      }
    }
</script>

<style scoped>

</style>

<template>
  <div class="main-container">
    <span class="right_title bottom20">用户列表</span>
    <span class="right-content-gonggao">为了提高其他人的用户感受,没有推出用户的删除和修改操作</span>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="_id" label="ID" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="400"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="demo(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="40%">
      <div class="avatarImg">
        <img src="https://img.meituan.net/avatar/4ba9758be0a301ef9e3d8f45e472b1563720.jpg" />
        <div class="userName">
          <span>用户名</span>
          {{obj&&obj.name}}
        </div>
        <div class="userPhone">
          <span>注册时间</span>
          {{obj&&obj.createTime}}
        </div>
        <div class="userSex">
          <span>性别</span>
          {{obj&&obj.sex}}
        </div>
        <div class="password">
          <span>密码</span>
          {{obj&&obj.password}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import add0 from '../../utils/time'
export default {
  async asyncData({ params, error, $axios }) {
    // 注意返回的就是响应数据
    const data = await $axios.$get(`/api/users/server/demo`)
    data.filter(v => {
      v.createTime = add0(v.createTime) // 时间过滤
      v.sex === undefined ? (v.sex = '空') : null
    })
    return { tableData: data }
    error({ statusCode: 400, message: 'id有误，查询失败' })
  },
  head: {
    title: '用户页面'
  },
  methods: {
    demo(row) {
      this.obj = row
      this.dialogVisible = true
    }
  },

  data() {
    return {
      dialogVisible: false,
      obj: null,
      tableData: []
    }
  }
}
</script>
<style>
.main-container {
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 20px rgba(102, 102, 102, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
}
.bottom20 {
  margin-bottom: 20px;
  display: block;
}
.avatarImg img {
  border-radius: 50%;
  float: left;
  margin-right: 20px;
}
.avatarImg span {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  display: inline-block;
}
.avatarImg span::after {
  content: ':';
}
</style>
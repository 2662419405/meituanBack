<template>
  <el-container>
    <!-- 头部展示 -->
    <el-header class="bgColor">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click=" $router.push('/') ">
          <span>首页展示</span>
        </el-menu-item>
        <el-menu-item index="2" @click=" $router.push('/user') ">
          <span>用户展示</span>
        </el-menu-item>
        <el-menu-item index="3" @click=" $router.push('/shang') ">
          <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click=" $router.push('/order') ">
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item class="right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              尊敬的:
              <strong class="zuoyou">{{userinfo.name}}</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-tools" command="setting">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <!-- 子组件 -->
        <transition name="fade">
          <div class="main">
            <nuxt-child></nuxt-child>
          </div>
        </transition>
      </el-main>
      <el-aside width="400px">
        <!-- 右侧个人展示 -->
        <right></right>
      </el-aside>
    </el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginHandler">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import Right from './right'
import { mapState } from 'vuex'

export default {
  async asyncData({ store, redirect }) {
    if (
      store.state.users.userinfo &&
      store.state.users.userinfo.name !== 'sh'
    ) {
      // return redirect('/login') 最后加进去
    }
  },
  components: {
    Right
  },
  head: {
    title: '首页'
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('users', ['userinfo'])
  },
  methods: {
    loginHandler() {
      // 退出登录
      this.$router.push('/login')
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.dialogVisible = true
      }
      if (command === 'setting') {
        console.log(this.$router)
        this.$router.push({ path: '/setting' })
      }
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    handleSelect(key, keyPath) {}
  }
}
</script>

<style>
.main {
  width: 1000px;
  margin: 0 auto;
}
.el-dropdown-link {
  color: #ffffff;
}
.right {
  float: right !important;
}
</style>
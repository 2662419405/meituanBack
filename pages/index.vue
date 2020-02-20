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
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <!-- 子组件 -->
        <transition name="fade">
          <nuxt-child></nuxt-child>
        </transition>
      </el-main>
      <el-aside>
        <!-- 右侧个人展示 -->
        <right></right>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import Right from './right'

export default {
  components: {
    Right
  },
  head: {
    title: '首页'
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
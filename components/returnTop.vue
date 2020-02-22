<template>
  <div class="returnTop" @click="backTop" v-if="isShow">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    backTop() {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 60) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style>
.returnTop {
  position: fixed;
  right: 180px;
  bottom: 20px;
  width: 60px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 32px;
  text-align: center;
  line-height: 40px;
  transition: all 0.5s;
  color: #9a9a9a;
  z-index: 20;
}
.returnTop:hover {
  transform: translateY(-6px);
}
</style>
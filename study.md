# 图片预加载

```js
  <template>
  <div>
    <div class="loading">
      <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
      <br />
      <span class="zhong">正在加载中</span>
    </div>
    <div v-show="false">
      <img src="/image/o_74911.jpg" alt />
      <img src="/image/o_770659.jpg" alt />
      <img src="/image/o_899029.jpg" alt />
      <img src="/image/sh.jpg" alt />
    </div>
    <div v-show="show">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var _this = this
    let imgs = document.querySelectorAll('img')
    this.num = imgs.length
    Array.from(imgs).forEach(item => {
      let img = new Image()
      img.onload = () => {
        this.count++
        this.percentage = Math.floor((this.count / imgs.length) * 100)
      }
      img.src = item.getAttribute('src')
    })
  },
  data() {
    return {
      count: 0,
      show: false,
      percentage: 0,
      num: 0,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  watch: {
    count(val, oldval) {
      if (val == this.num) {
        this.show = true
      }
    }
  }
}
</script>
<style scoped>
.loading {
  height: 200px;
  width: 126px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.zhong {
  text-align: center;
  display: block;
}
</style>
```

# 全局路由守卫

这里使用nprogress,在plugin中注册一个组件

```js
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default ({ store, app }) => {
  app.router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  app.router.afterEach((to, from, next) => {
    NProgress.done()
  })
}
```

最后在nuxt.config.js中导入

# 用canvas制作一个验证码

```html
<template>
  <div class="convas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
export default {
  name: 'SIdentify',
  props: {
    identifyCode: {
      type: String,
      default: '1234'
    },
    fontSizeMin: {
      type: Number,
      default: 20
    },
    fontSizeMax: {
      type: Number,
      default: 40
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 180
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    contentWidth: {
      type: Number,
      default: 112
    },
    contentHeight: {
      type: Number,
      default: 38
    }
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      let canvas = document.getElementById('s-canvas')
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      )
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      // this.drawLine(ctx)
      this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
  },
  watch: {
    identifyCode() {
      this.drawPic()
    }
  },
  mounted() {
    this.drawPic()
  }
}
</script>

<style scoped>
.convas {
  position: relative;
  left: 17px;
  top: 5px;
  display: inline-block;
}
</style>
```

# 返回顶部组件

```js
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
```
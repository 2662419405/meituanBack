<template>
  <div class="main-container ding">
    <el-timeline>
      <el-timeline-item timestamp="2020/2/21" placement="top">
        <el-card>
          <h4>搭建美团后台</h4>
          <p>使用 nuxt + element,主要是练习一些vue的基本使用</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/2/18" placement="top">
        <el-card>
          <h4>美团PC端完成</h4>
          <p>
            部署到服务器之上
            <a href="http://react.shtodream.cn/" target="_blank">网址</a>
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/2/15" placement="top">
        <el-card>
          <h4>美团移动端制作</h4>
          <p>
            使用Umi+Dva+Koa+Monnogo
            <a
              href="https://github.com/2662419405/meituanAn"
              target="_blank"
            >源码</a>
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/2/14" placement="top">
        <el-card>
          <h4>美团PC端完成</h4>
          <p>
            部署到服务器之上
            <a href="http://mt.shtodream.cn/" target="_blank">网址</a>
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/2/8" placement="top">
        <el-card>
          <h4>美团PC端制作</h4>
          <p>
            使用React原生技术栈
            <a href="https://github.com/2662419405/meituan" target="_blank">源码</a>
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/2/7" placement="top">
        <el-card>
          <h4>正式开工</h4>
          <p>打算全面练习React和Vue以及相关技术,最终选择针对美团制作</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
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
.ding a {
  color: skyblue;
}
</style>
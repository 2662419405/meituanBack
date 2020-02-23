<template>
  <div>
    <div class="main-container">
      <span class="right_title">PC美团</span>
      <span class="right-content-gonggao">
        已经完成,里面的数据使用了美团官网的对外开发的接口
        <a href="http://mt.shtodream.cn/">PC美团网址</a>
      </span>
      <span class="right_title">PC效果图</span>
      <div class="showImg">
        <ul>
          <li v-for="(item,index) in dataJson" :key="index" @click="zhanshiImg(item)">
            <img :src="item" />
          </li>
        </ul>
      </div>
    </div>
    <div class="main-container">
      <span class="right_title">移动端美团</span>
      <span class="right-content-gonggao">
        这里面的用户,商品和订单针对的都是移动端的数据(主要是时间有限)
        <a href="http://react.shtodream.cn/">移动端美团网址</a>
      </span>
      <span class="right_title">移动端美团效果图</span>
      <div class="showImg">
        <ul>
          <li v-for="(item,index) in dataImgJson" :key="index" @click="zhanshiImg(item)">
            <img :src="item" />
          </li>
        </ul>
      </div>
    </div>
    <div class="main-container">
      <span class="right_title">手机app美团</span>
      <span class="right-content-gonggao">暂时停止更新</span>
    </div>
    <el-dialog title="图片展示" :visible.sync="dialogVisible" width="80%" center>
      <img :src="showImg" class="ddImg" />
    </el-dialog>
  </div>
</template>

<script>
import dataJson from '../../config/img.json'
import dataImgJson from '../../config/androidImg.json'
export default {
  data() {
    return {
      dataJson: dataJson.data,
      dialogVisible: false,
      showImg: null,
      dataImgJson: dataImgJson.data
    }
  },
  methods: {
    zhanshiImg(item) {
      this.showImg = item
      this.dialogVisible = true
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
.showImg {
  padding: 20px;
  overflow: hidden;
}
.showImg img {
  width: 49%;
  float: left;
  cursor: pointer;
  display: block;
}
.ddImg {
  width: 100%;
}
</style>
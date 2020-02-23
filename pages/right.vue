<template>
  <div class="containerFlow">
    <div class="containerRight">
      <span class="right_title">残梦</span>
      <!-- 头像区域 -->
      <div class="rightAvatar">
        <img src="@/static/image/sh.jpg" class="rightAvatarImg" />
      </div>
      <!-- 个人链接区域 -->
      <div class="link">
        <ul>
          <li>
            <div>
              <a href="https://github.com/2662419405">
                <img src="https://static.iiter.cn/github.ico" />
                <span class="iconfont icon-github">github</span>
              </a>
            </div>
          </li>
          <li>
            <div>
              <a href="https://www.cnblogs.com/sunhang32/">
                <img src="https://static.iiter.cn/cnblogs.png" />
                <span class="iconfont icon-github">博客园</span>
              </a>
            </div>
          </li>
          <li>
            <div>
              <a href="https://blog.csdn.net/qq_43268396">
                <img src="https://static.iiter.cn/csdn.ico" />
                <span class="iconfont icon-github">CSDN</span>
              </a>
            </div>
          </li>
          <li>
            <div>
              <a href="http://shtodream.cn/">
                <img src="https://static.iiter.cn/vue.png" />
                <span class="iconfont icon-github">个人笔记</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="containerRight top-20">
      <span class="right_title">公告</span>
      <span
        class="right-content-gonggao"
      >本次练习为全面练习,分别针对vue,react,以及他们的常用库nuxt,dva,umi等.分别开发美团前端,后台,还有手机端,后期会继续练习微信小程序</span>
      <el-button @click="dialogFormVisible = true" type="primary" class="right-gonggao-btn">发现bug</el-button>
    </div>
    <div class="containerRight top-20">
      <span class="right_title">开发时的问题</span>
      <span class="right-content-gonggao">包含开发时遇到的绝大对数问题,前端后台服务器的可能都会有</span>
      <ul class="right-bug">
        <li>
          <span class="right-bug-title">1</span>
          <el-tooltip class="item" effect="dark" content="react+redux+thunk" placement="top-start">
            <a href="https://github.com/2662419405/meituan/blob/master/STUDY.md">react+redux+thunk</a>
          </el-tooltip>
        </li>
        <li>
          <span class="right-bug-title">2</span>
          <el-tooltip class="item" effect="dark" content="umi+dva+koa" placement="top-start">
            <a href="https://github.com/2662419405/meituanAn">umi+dva+koa</a>
          </el-tooltip>
        </li>
        <li>
          <span class="right-bug-title">3</span>
          <el-tooltip class="item" effect="dark" content="ReactNative" placement="top-start">
            <a href="https://github.com/2662419405/meituanApp">ReactNative</a>
          </el-tooltip>
        </li>
        <li>
          <span class="right-bug-title">4</span>
          <el-tooltip class="item" effect="dark" content="nuxt+element" placement="top-start">
            <a href="https://github.com/2662419405/meituanBack">nuxt+element</a>
          </el-tooltip>
        </li>
        <li>
          <span class="right-bug-title">5</span>
          <el-tooltip class="item" effect="dark" content="全栈demo大合集" placement="top-start">
            <a href="https://github.com/2662419405/AllDemo">全栈demo大合集</a>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="containerRight top-20">
      <span class="right_title">程序猿鼓励师</span>
      <img
        alt="娱乐"
        class="bianxiao"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571768014502&di=67e12d4b16a14cb87ababe70962b01bc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F5988171fd6ccb.jpg"
      />
    </div>
    <el-dialog title="意见反馈" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="您的尊称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="Peanut" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="您的微信" :label-width="formLabelWidth" prop="weixin">
          <el-input v-model="form.weixin" autocomplete="off" placeholder="Weixin"></el-input>
        </el-form-item>
        <el-form-item label="您的QQ" :label-width="formLabelWidth" prop="qq">
          <el-input v-model="form.qq" autocomplete="off" placeholder="QQ"></el-input>
        </el-form-item>
        <el-form-item label="您的意见" :label-width="formLabelWidth" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="在此填下你的宝贵意见" maxlength="120"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        wexin: '',
        qq: '',
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        weixin: [
          {
            required: true,
            message: '请输入微信',
            trigger: 'blur'
          }
        ],
        qq: [
          {
            required: true,
            message: '请输入qq',
            trigger: 'blur'
          }
        ],
        desc: [{ max: 120, message: '长度在 120 个字符 以内', trigger: 'blur' }]
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '意见已经提交,正在处理,感谢你的反馈',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
.top-20 {
  margin-top: 20px;
}
.containerFlow {
  padding: 20px;
}
.containerRight {
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 20px;
}
.containerRight .bianxiao {
  width: 90%;
  margin: 20px auto 0;
  border-radius: 5px;
  display: block;
}
.rightAvatar {
  width: 60%;
  margin: 0 auto;
}
.rightAvatarImg {
  width: 100%;
  border-radius: 50%;
  animation: dong 3s infinite linear;
  margin: 0 auto;
}
.link ul li {
  width: 45%;
  float: left;
  box-shadow: 0 0 10px rgba(102, 102, 102, 0.2);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 13px;
  transition: all 0.3s;
  padding: 4px 5px;
}
.link ul li:nth-child(2n) {
  margin-right: 0;
  margin-left: 0;
}
.link ul li:hover {
  box-shadow: 0 0 10px rgba(102, 102, 102, 0.4);
  transform: scale(1.1);
}
.link ul li:hover a {
  color: #736efe;
}
.link ul {
  padding-top: 20px;
  overflow: hidden;
}
.link ul li a {
  display: block;
  margin-left: 10px;
}
.link ul li img {
  width: 19px;
  height: 19px;
}
.right_title {
  padding-left: 20px;
  margin-left: 10px;
  font-size: 16px;
  box-sizing: border-box;
  font-weight: normal;
  color: #6a6a6a;
  border-left: 3px solid #736efe;
  height: 18px;
  line-height: 18px;
}
.right-content-gonggao {
  width: 100%;
  margin: 20px 0;
  line-height: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #a0a0a0;
}
.right-gonggao-btn {
  width: 100%;
}
.right-bug li {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
}
.right-bug li a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6a6a6a;
  margin-left: 10px;
}
.right-bug-title {
  width: 30px;
  margin: 0 5px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 5px;
  background: #f3f3f3;
  color: #6a6a6a;
}
.right-bug li:nth-child(1) .right-bug-title {
  background: #ff2a2a;
  color: #fff;
}
.right-bug li:nth-child(2) .right-bug-title {
  color: #fff;
  background: #ff7171;
}
.right-bug li:nth-child(3) .right-bug-title {
  color: #fff;
  background: #ff9900;
}
.nameNum {
  position: absolute;
  top: 0;
  right: 5px;
  transition: all 0.3s;
  pointer-events: none;
  text-align: center;
  height: 100%;
  color: #c0c4cc;
}
.el-dialog__header {
  text-align: center;
}
</style>
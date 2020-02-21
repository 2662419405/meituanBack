<template>
  <div class="container" ref="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
    >
      <h2 class="zhong">美团后台管理系统</h2>
      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="默认用户名: sh"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="默认密码: sh"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model.number="ruleForm.code" class="ban"></el-input>
        <div class="code" @click="refreshCode">
          <v-sidentify :identifyCode="identifyCode"></v-sidentify>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Sidentify from '../components/code'
import { mapMutations } from 'vuex'
export default {
  layout: 'login',
  head: {
    title: '登录页面'
  },
  components: {
    'v-sidentify': Sidentify
  },
  created() {
    this.init()
  },
  destroyed() {
    this.clearInit()
  },
  mounted: function() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    ...mapMutations('users', ['add']),
    init() {
      this.timer = setInterval(() => {
        this.index++
      }, 5000)
    },
    clearInit() {
      clearInterval(this.timer)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 正常情况下调用后台api接口
          if (this.ruleForm.user === 'sh' && this.ruleForm.password === 'sh') {
            this.$message({
              message: '登录成功,进行跳转',
              type: 'success'
            })
            window.localStorage.setItem('token', true) // 存储token和用户状态
            this.add({
              name: this.ruleForm.user,
              password: this.ruleForm.password
            })
            this.$router.push('/')
          } else {
            this.$message.error('账号密码错误')
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    }
  },
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (value != this.identifyCode) {
        return callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      index: 0,
      identifyCodes: '1234567890',
      identifyCode: '', // 验证码答案
      bgCover: [
        '/image/o_770659.jpg',
        '/image/o_899029.jpg',
        '/image/o_74911.jpg'
      ],
      count: 0,
      ruleForm: {
        user: '',
        password: '',
        code: ''
      },
      rules: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }]
      }
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    index: function(newQuestion, oldQuestion) {
      if (newQuestion === this.bgCover.length) {
        this.index = 0
      } else {
        this.$refs.container.style.backgroundImage =
          'url(' + this.bgCover[this.index] + ')'
      }
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-image: url('../static/image/o_74911.jpg');
  background-size: cover;
  background-position: center;
  transition: background 1.5s ease;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ban {
  width: 50%;
  position: relative;
  top: -10px;
}
.demo-ruleForm {
  font-weight: bold;
  width: 350px;
  height: 300px;
  padding: 30px;
  box-sizing: content-box;
  margin: auto;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}
.zhong {
  text-align: center;
  padding-bottom: 20px;
}
.code {
  display: inline-block;
  cursor: pointer;
}
</style>
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
      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model.number="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'login',
  created() {
    this.init()
  },
  destroyed() {
    this.clearInit()
  },
  head: {
    title: '登录页面'
  },
  mounted: function() {
    let imgs = []

    for (let img of imgs) {
      let image = new Image()
      image.src = img
      image.onload = () => {
        console.log(this.count)
        this.count++
      }
    }
  },
  methods: {
    init() {
      this.timer = setInterval(() => {
        this.index++
      }, 7000)
    },
    clearInit() {
      clearInterval(this.timer)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
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
.demo-ruleForm {
  font-weight: bold;
  width: 350px;
  height: 230px;
  padding: 30px;
  box-sizing: content-box;
  margin: auto;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}
</style>
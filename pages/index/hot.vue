<template>
  <div class="main-container">
    <span class="right_title bottom20">商品列表</span>
    <span class="right-content-gonggao">为了防止恶意删除数据,只能增加不能修改或者删除</span>
    <!-- 添加表单 -->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="200px">
      <el-form-item label="页面标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 图片url地址 -->
      <el-form-item
        v-for="(domain, index) in form.imgUrls"
        :label="'图片地址' + index"
        :key="domain.key"
        :prop="'imgUrls.' + index"
        :rules="{
      required: true, message: '图片地址不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="domain.url" placeholder="请输入http或者https图片地址,图片上传暂时没弄" class="width90"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增图片地址</el-button>
      </el-form-item>
      <el-form-item label="发布内容" prop="title">
        <div
          class="quill-editor"
          @change="onEditorChange($event)"
          :content="form.tain"
          v-quill:myQuillEditor="editorOption"
        ></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head: {
    title: '热门商品'
  },
  data() {
    return {
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      },
      form: {
        // 首页标题
        title: '',
        // 图片路径
        imgUrls: [
          {
            url: ''
          }
        ],
        // 文本域
        textArea: '',
        // 发布者姓名
        name: '后台_Sh'
      },
      rules: {
        title: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        textArea: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('users', ['addHot']),
    // 新增和删除操作
    removeDomain(item) {
      var index = this.form.imgUrls.indexOf(item)
      if (index !== -1) {
        this.form.imgUrls.splice(index, 1)
      }
    },
    onEditorChange({ editor, html, text }) {
      this.form.textArea = html
    },
    addDomain() {
      this.form.imgUrls.push({
        url: '',
        key: Date.now()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addHot(this.form)
          this.$message({
            type: 'success',
            message: '数据录入成功'
          })
        } else {
          return false
        }
      })
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
</style>
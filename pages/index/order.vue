<template>
  <div class="main-container">
    <span class="right_title bottom20">商品列表</span>
    <span class="right-content-gonggao">为了防止恶意删除数据,只能增加不能修改或者删除</span>
    <!-- 添加表单 -->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="200px">
      <el-form-item label="菜品名称" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否是美团专送" prop="zhuan">
        <el-radio v-model="form.zhuan" label="false">支持</el-radio>
        <el-radio v-model="form.zhuan" label="true">不支持</el-radio>
      </el-form-item>
      <el-form-item label="菜品名称" prop="ping">
        <el-input-number :min="0" :max="5" v-model="form.ping" placeholder="商家评分" class="width445"></el-input-number>
      </el-form-item>
      <el-form-item label="月售数量" prop="show">
        <el-input v-model="form.show" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="配送费(0代表免费)" prop="pei">
        <el-input v-model="form.pei" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="起送价" prop="start">
        <el-input v-model="form.start" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="人均消费" prop="ren">
        <el-input v-model="form.ren" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="address">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片logo" prop="imgUrl">
        <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选择分类" prop="te">
        <el-select v-model="form.te" placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告" prop="gong">
        <el-input v-model="form.gong" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 商品项 -->
      <el-form-item
        v-for="(domain, index) in form.tags"
        :label="'商品项' + index"
        :key="domain.key"
        :prop="'tags.' + index"
      >
        <el-input v-model="domain.url" placeholder="请输入本店商品项特色" class="width90"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增商品项</el-button>
      </el-form-item>
      <el-form-item label="详细地址" prop="xiang">
        <el-input v-model="form.xiang" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="配送时间" prop="time">
        <el-input v-model="form.time" autocomplete="off"></el-input>
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
      options: [
        {
          value: '西式快餐',
          label: '西式快餐'
        },
        {
          value: '韩国炸鸡',
          label: '韩国炸鸡'
        },
        {
          value: '东北菜',
          label: '东北菜'
        },
        {
          value: '麻辣香锅',
          label: '麻辣香锅'
        },
        {
          value: '中式简餐',
          label: '中式简餐'
        },
        {
          value: '冒菜',
          label: '冒菜'
        },
        {
          value: '北京菜',
          label: '北京菜'
        },
        {
          value: '快餐小吃',
          label: '快餐小吃'
        }
      ],
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
        ping: 0,
        zhuan: false,
        show: '',
        pei: 0,
        start: '',
        ren: '',
        imgUrl: '',
        te: '',
        tags: [],
        address: '',
        gong: '',
        xiang: '',
        time: ''
      },
      rules: {
        title: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        ping: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        zhuan: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        show: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        pei: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        start: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        ren: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        imgUrl: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        te: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        address: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        gong: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        xiang: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '输入项不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('users', ['addHot']),
    // 新增和删除操作
    removeDomain(item) {
      var index = this.form.tags.indexOf(item)
      if (index !== -1) {
        this.form.tags.splice(index, 1)
      }
    },
    onEditorChange({ editor, html, text }) {
      this.form.textArea = html
    },
    addDomain() {
      this.form.tags.push({
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
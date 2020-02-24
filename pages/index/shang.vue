<template>
  <div class="main-container">
    <span class="right_title bottom20">商品列表</span>
    <span class="right-content-gonggao">为了防止恶意删除数据,只能增加不能修改或者删除</span>
    <!-- 添加表单 -->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="200px">
      <el-form-item label="销量" prop="xiao">
        <el-input v-model="form.xiao" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原先价格" prop="old">
        <el-input v-model="form.old" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新价格" prop="new">
        <el-input v-model="form.new" autocomplete="off"></el-input>
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
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub">
        <el-input v-model="form.sub" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="页面标题" prop="sup">
        <el-input v-model="form.sup" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否支持随时退款" prop="sui">
        <el-radio v-model="form.sui" label="false">支持</el-radio>
        <el-radio v-model="form.sui" label="true">不支持</el-radio>
      </el-form-item>
      <el-form-item label="是否支持过期自动退款" prop="guo">
        <el-radio v-model="form.guo" label="false">支持</el-radio>
        <el-radio v-model="form.guo" label="true">不支持</el-radio>
      </el-form-item>
      <el-form-item label="90天内消费数量" prop="num">
        <el-slider v-model="form.num"></el-slider>
      </el-form-item>
      <!-- 商家列表 -->
      <el-form-item
        v-for="(domain, index) in form.xiangqings"
        :label="'商家列表: 名称,评分' + index"
        :key="domain.key"
        :prop="'xiangqings.' + index"
        :rules="{
      required: true, message: '输入项不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="domain.name" placeholder="商家名称" class="width445"></el-input>
        <el-input-number
          :min="0"
          :max="5"
          v-model="domain.ping"
          placeholder="商家评分"
          class="width445"
        ></el-input-number>
        <el-button @click.prevent="removeShang(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addShang">新增商家列表</el-button>
      </el-form-item>
      <!-- 团购信息 -->
      <el-form-item
        v-for="(domain, index) in form.tuans"
        :label="'团购信息: 名称,数量,单价' + index"
        :key="domain.key"
        :prop="'tuans.' + index"
        :rules="{
      required: true, message: '图片地址不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="domain.name" placeholder="团购名称" class="width30"></el-input>
        <el-input-number :min="1" :max="10" v-model="domain.num" class="width30"></el-input-number>
        <el-input-number :min="1" :max="10000" v-model="domain.price" class="width30"></el-input-number>
        <el-button @click.prevent="removePing(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addPing">新增团购信息</el-button>
      </el-form-item>
      <el-form-item label="团购说明">
        <div
          class="quill-editor"
          @change="onEditorChange($event)"
          :content="form.tain"
          v-quill:myQuillEditor="editorOption"
        ></div>
      </el-form-item>
      <el-form-item label="页面地址" prop="quanAddress">
        <el-input v-model="form.quanAddress" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 购买须知 -->
      <el-form-item label="有效期" prop="youxiao">
        <el-input v-model="form.youxiao" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="预约信息" prop="yuyue">
        <el-input v-model="form.yuyue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="规则提醒" prop="tixing">
        <el-input v-model="form.tixing" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="温馨提示" prop="tishi">
        <el-input v-model="form.tishi" autocomplete="off"></el-input>
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
    title: '商品页面'
  },
  data() {
    return {
      dialogFormVisible: false,
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
        xiao: '',
        name: '',
        old: '',
        new: '',
        address: '',
        sub: '',
        sup: '',
        sui: '',
        guo: '',
        num: 0,
        quanAddress: '',
        imgUrls: [
          {
            url: ''
          }
        ],
        xiangqings: [
          {
            name: '',
            ping: ''
          }
        ],
        tuans: [
          {
            name: '',
            num: '',
            price: ''
          }
        ],
        tain: '',
        youxiao: '',
        yuyue: '',
        tixing: '',
        tishi: ''
      },
      rules: {
        xiao: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        xiao: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        old: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        new: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        address: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        sub: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        sup: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        sui: [{ required: true, message: '输入项不能为空', trigger: 'change' }],
        guo: [{ required: true, message: '输入项不能为空', trigger: 'change' }],
        num: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        quanAddress: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        tain: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        youxiao: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        yuyue: [{ required: true, message: '输入项不能为空', trigger: 'blur' }],
        tixing: [
          { required: true, message: '输入项不能为空', trigger: 'blur' }
        ],
        tishi: [{ required: true, message: '输入项不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('users', ['addOrder']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addOrder(this.form)
        } else {
          return false
        }
      })
    },
    onEditorChange({ editor, html, text }) {
      this.form.tain = html
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 新增和删除操作
    removeDomain(item) {
      var index = this.form.imgUrls.indexOf(item)
      if (index !== -1) {
        this.form.imgUrls.splice(index, 1)
      }
    },
    addDomain() {
      this.form.imgUrls.push({
        url: '',
        key: Date.now()
      })
    },
    removeShang(item) {
      var index = this.form.xiangqings.indexOf(item)
      if (index !== -1) {
        this.form.xiangqings.splice(index, 1)
      }
    },
    addShang() {
      this.form.xiangqings.push({
        name: '',
        ping: '',
        key: Date.now()
      })
    },
    removePing(item) {
      var index = this.form.tuans.indexOf(item)
      if (index !== -1) {
        this.form.tuans.splice(index, 1)
      }
    },
    addPing() {
      this.form.tuans.push({
        name: '',
        num: '',
        price: '',
        key: Date.now()
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
.width90 {
  width: 90%;
}
.width445 {
  width: 44.5%;
}
.width30 {
  width: 29.5%;
}
</style>
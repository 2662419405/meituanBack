<template>
  <div class="main-container">
    <span class="right_title bottom20">商品列表</span>
    <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>
    <!-- 添加表单 -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
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
          <el-radio v-model="form.sui" label=false>支持</el-radio>
          <el-radio v-model="form.sui" label=true>不支持</el-radio>
        </el-form-item>
        <el-form-item label="是否支持过期自动退款" prop="guo">
          <el-radio v-model="form.guo" label=false>支持</el-radio>
          <el-radio v-model="form.guo" label=true>不支持</el-radio>
        </el-form-item>
        <el-form-item label="90天内消费数量" prop="num">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面地址" prop="quanAddress">
          <el-input v-model="form.quanAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
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
        num: '',
        quanAddress: ''
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
        ]
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
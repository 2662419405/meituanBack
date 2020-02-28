const code = require('koa-router')()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// 加载mongodb数据库
const dbName = require('../../config/db')
const model = require('../model')
const Back = model.getNames('back')
const Meituan = model.getNames('meituan')
const Hot = model.getNames('hot')
const hashCode = require('../utils/hasCode') // 密码加盐
const secret = dbName.secret

// 获取全部用户
code.get('/demo', async ctx => {
  const obj = await Meituan.find({})
  ctx.body = JSON.stringify(obj)
})

// 提交数据
code.post('/order', async ctx => {
  const payload = ctx.request.body
  const userModel = new Back(payload)
  let obj = await userModel.save()
  ctx.body = {
    code: 1,
    message: '上传完成'
  }
})

// 提交热门
code.post('/hot', async ctx => {
  const payload = ctx.request.body
  const userModel = new Hot(payload)
  let obj = await userModel.save()
  ctx.body = {
    code: 1,
    message: '上传完成'
  }
})

module.exports = code.routes()

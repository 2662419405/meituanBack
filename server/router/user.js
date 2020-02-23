const code = require('koa-router')()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// 加载mongodb数据库
const dbName = require('../../config/db')
const model = require('../model')
const Meituan = model.getNames('meituan')
const hashCode = require('../utils/hasCode') // 密码加盐
const secret = dbName.secret

// 获取全部用户
code.get('/demo', async ctx => {
  const obj = await Meituan.find({})
  ctx.body = JSON.stringify(obj)
})

module.exports = code.routes()

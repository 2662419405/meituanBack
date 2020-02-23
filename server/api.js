const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const config = require('../config/db')
const router = new Router({ prefix: '/api/users' })

// 注册登录路由加载
router.use('/server', require('./router/user.js'))

// 加载所有路由
app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`服务器运行在${config.port}端口上`)
})

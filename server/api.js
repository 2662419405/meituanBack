const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const config = require('../config/db')
const koaBody = require('koa-body')
const router = new Router({ prefix: '/api/users' })

// 加载文件 使用 koa-body 代替 koa-bodyparser 和 koa-multer
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
)

// 注册登录路由加载
router.use('/server', require('./router/user.js'))

// 加载所有路由
app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`服务器运行在${config.port}端口上`)
})

export default ({ app }) => {
  app.router.afterEach((to, from) => {
    // 判断token是否存在,去登录页面
  })
}

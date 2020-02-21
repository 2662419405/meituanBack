export default ({ store, app }) => {
  app.router.beforeEach((to, from, next) => {
    next()
  })
}

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default ({ store, app }) => {
  app.router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  app.router.afterEach((to, from, next) => {
    NProgress.done()
  })
}

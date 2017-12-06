import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import configs from '@/configs'
import {store} from '@/plugins';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // mode: 'history'
});
router.afterEach((to) => {
  document.title = `${to.meta.title} - ${configs.title}`;
})

router.beforeEach((to, from, next) => {
  // 如果未登录，跳转

  if(to.path === '/signup' || to.path === '/signin') {
    if(window.sessionStorage.getItem('IS_LOGIN') !== null) {
      next({
        name: 'Home',
      })
    } else {
      next()
    }
  } else {
    if (window.sessionStorage.getItem('IS_LOGIN') === null && to.path !== '/' && to.path !== '/home') {
      next({
        name: 'Welcome',
        query: {redirect: to.fullPath}
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }
  }

});

export default router;

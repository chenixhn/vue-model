import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import routes from './router'

const router = new Router({
  routes
})

// 路由钩子
router.beforeEach(({path},from,next)=>{

  // let isLogin = sessionStorage.getItem('isLogin');
  // console.log(isLogin);
  // if(isLogin != 'true' && path !== '/login' && path !== '/register' && path !== '/resetPwd'){
  //   return next({path:'/index'})//配置跳转页面
  // }

  next();

})

export default router

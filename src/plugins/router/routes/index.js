import Welcome from '@/views/Welcome/Welcome.vue'
import Home from '@/views/Home/Home.vue'
import Label from '@/views/Label/Label.vue'
import Detail from '@/views/Detail/Detail.vue'
import Personal from '@/views/Personal/Personal.vue'
import Liked from '@/views/Liked/Liked.vue'
import About from '@/views/About/About.vue'
import Signin from '@/views/Signin/Signin.vue'
import Signup from '@/views/Signup/Signup.vue'


// 微信授权不能异步加载组件
export default [
  {
    path: '/',
    component: Welcome,
    name: 'Welcome',
    meta: {
      title: '欢迎页'
    }
  },
  {
    path: '/home',
    component: Home,
    name: 'Home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/label/:id',
    component: Label,
    name: '分类',
    meta: {
      title: '分类'
    }
  },
  {
    path: '/detail/:id',
    component: Detail,
    name: '文章详情',
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/personal',
    component: Personal,
    name: '个人资料',
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/liked',
    component: Liked,
    name: '活动收藏',
    meta: {
      title: '活动收藏'
    }
  },
  {
    path: '/about',
    component: About,
    name: '关于我们',
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/signin',
    component: Signin,
    name: 'Login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/signup',
    component: Signup,
    name: 'Register',
    meta: {
      title: '注册'
    }
  },
  {
    path: '*',
    name: '404',
    redirect: '/'
  }
  ];

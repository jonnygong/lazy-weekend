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
    name: '欢迎页'
  },
  {
    path: '/home',
    component: Home,
    name: '首页'
  },
  {
    path: '/label',
    component: Label,
    name: '分类'
  },
  {
    path: '/detail',
    component: Detail,
    name: '文章详情'
  },
  {
    path: '/personal',
    component: Personal,
    name: '个人资料'
  },
  {
    path: '/liked',
    component: Liked,
    name: '活动收藏'
  },
  {
    path: '/about',
    component: About,
    name: '关于我们'
  },
  {
    path: '/signin',
    component: Signin,
    name: '登录'
  },
  {
    path: '/signup',
    component: Signup,
    name: '注册'
  },
  {
    path: '*',
    name: '404',
    redirect: '/'
  }
  ];

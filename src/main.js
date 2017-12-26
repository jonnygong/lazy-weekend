/**
 *  @todo: 项目根js文件
 *  @desc: 一切项目的起始部分
 *  @time: 2017年3月13日11:42:09
 *  @author: helloLaoYang<https://github.com/helloLaoYang>
 *  @document: https://cn.vuejs.org/v2/api/
 **/

// import vue && plugins
import Vue from 'vue';
// 加入路由以及vuex
import { router, store } from '@/plugins';
// create new Vue as app
import App from './App.vue';


// new vue instance
export default new Vue({
    router,
    store,
    ...App
}).$mount('#app');

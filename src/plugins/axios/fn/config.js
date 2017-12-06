/**
 *  axios 配置文件
 *  @desc: 配置ajax headers request Response 数据预处理
 *  @author: helloLaoYang<aaron@codonas.cn>
 */

import Vue from 'vue';
import Qs from 'qs';
import axios from 'axios';
import systems from '@/configs';
import configs from '@/configs/api';

const {baseUrl} = configs;
// 确认默认链接
axios.defaults.baseURL = baseUrl;

// 初始化post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['token'] = `${sessionStorage.JWT_TOKEN}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })


/*
* todo: 预处理Requests数据
* desc: 进行数据转换，添加默认字段等
* @return data;
**/
// axios.defaults.transformRequest = function _transformRequest(params = {}) {
//   const auth = localStorage.getItem('auth');
//   // Object.assign({auth: auth}, params);
//   // 返回完整数据，请求ajax
//   return Qs.stringify(Object.assign({auth: auth}, params));
// };

/*
* todo: 预处理Response数据
* desc: 可以进行返回码操作
* @return data || null;
**/
axios.defaults.transformResponse = function _transformResponse(res) {
  // 处理返回数据
  try {
    res = JSON.parse(res);
    // 判断返回值是否为对象
    if(typeof res !== 'object') {
      Vue.$toast({
        message: '服务器有问题！',
        position: 'middle',
        duration: 2000
      });
    }
  } catch (e) {
    Vue.$toast({
      message: '服务器有问题！',
      position: 'middle',
      duration: 2000
    });
    return null;
  }
// 状态正常
  if (res.errno > 0) {
    switch (res.errno) {
      case 401: // 没有登录
        // case 1020: // 您没有访问权限
        // case 104: // 请勿非法访问
        // case 306: // 身份信息过期
        // 需要跳转路由，清除登录状态
        // Vue.$store.dispatch('login_out');
        // Vue.$router.push('/login');
        Vue.$toast({
          message: res.errmsg,
          position: 'bottom',
          duration: 2000
        });
        break;
      default:
        // 其他错误提示错误信息，返回data
        Vue.$toast({
          message: res.errmsg,
          position: 'bottom',
          duration: 2000
        });
        break;
    }
    return null;
  } else {
    return res;
  }
};

export default {
  // 接口请求baseUrl
  baseUrl: 'http://localhost:8360/',
  // 接口文档地址
  api: {
    // apiForAuth: 'http://api.mp.kfw001.com/auth/wechat/getMember',
    userSignin: '/app/user/login', // 登录
    userSignup: '/app/user/reg',
    labelList: '/label/list',
  }
};

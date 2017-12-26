export default {
  // 接口请求baseUrl
  baseUrl: 'http://server-jp.52admin.net/',
  // 接口文档地址
  api: {
    // apiForAuth: 'http://api.mp.kfw001.com/auth/wechat/getMember',
    userSignin: '/api/user/login', // 登录
    userSignup: '/api/user/reg',
    userInfo: '/api/user/info',
    userUpdate: '/api/user/update',
    slideList: '/api/article/top',
    articleList: '/api/article/list',
    articleDetail: '/api/article/detail',
    tagList: '/api/tag/list',
    areaList: '/api/area/list',
    addLike: '/api/article/like',
    likeList: '/api/article/likelist',
  }
};

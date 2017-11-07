<template>
  <div>
    <div class="bg">
      <img src="http://dummyimage.com/1745x492/f1d65b" alt=""/>
    </div>
    <div class="btn">
      <router-link to="/signin"><mt-button class="signin" plain>登录</mt-button></router-link>
      <router-link to="/signup"><mt-button class="signup" plain>注册</mt-button></router-link>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    /*background-image: url("http://dummyimage.com/1745x492/f1d65b");*/
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    position: absolute;
    bottom: 5rem;
    z-index: 99;
    width: 100%;
    height: 3rem;
    margin: 0 auto;
    .signup {
      width: 8rem;
      height: 3rem;
      position: fixed;
      left: 4rem;
    }
    .signin {
      width: 8rem;
      height: 3rem;
      position: fixed;
      right: 4rem;
    }

    float: left;
  }
</style>

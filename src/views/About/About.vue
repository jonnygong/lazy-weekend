<template>
  <div>
    <mt-header title="关于我们" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <div class="pic_lg">
        <img src="https://img.qianduanmei.com/2017/03/17/0019_line_logo.jpg" alt=""/>
      </div>
      <div class="about">
        懒人周末是一款个性化的内容推荐应用，推荐精致的周末生活方式。内容涵盖同城活动、美食、周边游、运动、度假、演唱会、
        话剧、音乐会、读书会、展览、户外、酒吧、购物、电影、公益等，部分活动在APP上预订会带来令人惊喜的超低折扣。
        <p>在这里，每一个周末都是惊喜！</p>
      </div>
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
  .label {
    background-color: #fff;
    color: #3c424a;
  }

  .selected {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-top: -0.5rem;
    li {
      padding: 1rem 0;
      border-bottom: 1px solid #f2f2f2;
    }
    img {
      width: 100%;
      height: 20rem;
    }
    p {
      padding: 0 0.8rem;
      line-height: 28px;

    }
    .title {
      font-size: 16px;
      color: #000;

    }
    .place {
      color: #999;
      font-size: 14px;
      span {
        padding: 0 1rem;
        &:first-child {
          padding-left: 0;
        }
      }
    }
    .time {
      color: #999;
      font-size: 14px;

      span {
        margin: 0 1rem;
        border: 1px solid #999;
        padding: 0 0.3rem;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          position: absolute;
          right: 0;
          line-height: 19px;
          margin-top: 3px;
        }
      }
    }
  }

  .container {
    width: 100%;
    .pic_lg{
      width: 31.5rem;
      height: 25rem;
    }
    .about {
      text-indent: 2em;
      font-size: 14px;
      padding: 0 2rem;
      line-height: 22px;
      p {
        margin-top: 1rem;
        text-align: center;
      }
    }
  }
</style>

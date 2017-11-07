<template>
  <div>
    <mt-header title="活动详情" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="cover">
      <img src="http://dummyimage.com/1745x492/e3c933" alt="主题聚会"/>
      <p class="title">2017杭州万圣节重磅活动魔女惊魂主题惊悚派对</p>
      <div class="type">
        <p><i class="fa fa-bath" aria-hidden="true"></i>主题聚会<span>￥98</span></p>
      </div>
      <p class="time">10月27日 19：30-20：30</p>
      <p class="place">杭州万塘路262号万塘汇城市生活广场南楼2F</p>
      <div class="detail">
        <h1>活动详情</h1>
        <div v-html="detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          detail: ''
        }
    }
}
</script>

<style lang="scss">
  .label {
    background-color: #fff;
    color: #3c424a;
  }

  .cover {
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    margin-top: -0.5rem;

    img {
      width: 100%;
      height: 25rem;
    }
    p {
      padding: 1rem;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .type {
      background-color: #fff;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      font-size: 16px;
      i {
        padding-right: 0.5rem
      }
      span {
        float: right;
      }
    }
    .time {
      font-size: 14px;
    }
    .place {
      font-size: 14px;
      padding-top: 0;
      border-bottom: 1px solid #f5f5f5;
    }
    .detail {
      width: 100%;
      h1 {
        text-align: center;
        font-weight: inherit;
        margin-top: 2rem;
      }
    }
  }
</style>

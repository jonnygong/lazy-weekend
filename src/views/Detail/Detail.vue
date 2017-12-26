<template>
  <div class="bg">
    <mt-header title="活动详情" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="cover">
      <img :src="this.detailList.cover" :alt="this.detailList.title"/>
      <p class="title">{{ this.detailList.title }}</p>
      <div class="type">
        <p><i class="fa fa-bath" aria-hidden="true"></i>{{ this.detailList.type }}<span>￥{{ this.detailList.price }}</span></p>
      </div>
      <p class="time">{{ this.detailList.time }}</p>
      <p class="place">{{ this.detailList.place }}</p>
      <div class="detail">
        <h1>活动详情</h1>
        <div v-html="detailList.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: {
        title: '',
        type: '',
        cover: '',
        palce: '',
        like: '',
        time: '',
        area: '',
        content: '',
      },
      
    };
  },
  methods: {
    async getArticleDetail() {
      let params = {
        id: this.$route.params.id
      };
      const res = await this.$http.get("articleDetail", params);
      if (res === null) return;
      this.detailList = res.data;
    }
  },
  mounted() {
    this.getArticleDetail();
  }
};
</script>

<style lang="scss" scoped>
// .bg {
//   background-color: #fff;
// }
.label {
  background-color: #fff;
  color: #3c424a;
}

.cover {
  width: 100%;
  height: 100%;
  background-color: #fff;
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
      padding-right: 0.5rem;
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
    padding: 1rem 1rem;
    h1 {
      text-align: center;
      font-weight: inherit;
      margin-top: 2rem;
    }
  }
}
</style>

<template>
  <div>
    <mt-header title="收藏的活动" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="selected">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5">
        <li v-for="(item, index) in selectedList">
          <div class="img">
            <img :src="item.cover" :alt="item.title"/>
          </div>
          <div class="desc">
            <p class="title">{{ item.title }}</p>
            <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
            <p class="time"><span>{{ item.time }}</span><span>￥{{ item.price }}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedList: [
        // {
        //   title: "一杯红酒，一部电影，把我的故事讲给懂的人听！",
        //   img: "http://dummyimage.com/1745x492/e3c933",
        //   place: "温妮红酒线下体验店",
        //   type: "主题聚会",
        //   time: "每周五 19：30",
        //   like: "♡21",
        //   price: "￥68"
        // },
        // {
        //   title: "一杯红酒，一部电影，把我的故事讲给懂的人听！",
        //   img: "http://dummyimage.com/1745x492/e3c933",
        //   place: "温妮红酒线下体验店",
        //   type: "主题聚会",
        //   time: "每周五 19：30",
        //   like: "♡21",
        //   price: "￥68"
        // },
        // {
        //   title: "一杯红酒，一部电影，把我的故事讲给懂的人听！",
        //   img: "http://dummyimage.com/1745x492/e3c933",
        //   place: "温妮红酒线下体验店",
        //   type: "主题聚会",
        //   time: "每周五 19：30",
        //   like: "♡21",
        //   price: "￥68"
        // }
      ]
    };
  },
  methods: {
    async getDataList() {
      let params = {};
      const res = await this.$http.get("likeList", params);
      if (res === null) return;
      this.selectedList = res.data;
    }
  },
  mounted() {
    this.getDataList();
  }
};
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
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .img {
    width: 12rem;
    height: 12rem;
    display: flex;
    img {
      width: 10rem;
      height: 10rem;
      padding: 1rem;
    }
  }
  p {
    line-height: 28px;
  }
  .desc {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 1rem;
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
}
</style>

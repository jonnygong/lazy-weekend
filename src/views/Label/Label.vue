<template>
  <div>
    <mt-header :title="this.$route.params.id == 0 ? '全部分类' : titleList[this.$route.params.id]" class="label">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="selected">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5">
        <li v-for="(item, index) in selectedList">
          <img :src="item.cover" :alt="item.title" @click="toDetail($index,item)"/>
          <p @click="toDetail($index,item)" class="title">{{ item.title }}</p>
          <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
          <p class="time"><span>{{ item.time }}</span><span @click="addLike(item)">♡{{ item.like }}</span><span>￥{{ item.price }}</span></p>
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
            
          ],
          titleList: {},
          // list: []
        }
    },
    methods: {
      async getTagData() {
        let params = {
          
        };
        const res = await this.$http.get("tagList", params);
        if (res === null) return;
        res.data.forEach(item => {
          this.titleList[item.id] = item.type
   
        });
        // this.titleList.unshift({type: "全部分类", id: 0, icon: "fa fa-snowflake-o fa-3x", pid: 0});
        // this.list = res.data.list;
      },
      async getListData() {
       
        let params = {
          type: this.$route.params.id,
          area: this.$route.params.area,
          popular: this.$route.params.popular,
          keyword: this.$route.params.keyword,
        };
        const res = await this.$http.get("articleList",  this.$route.params.id == 0 ? {} : params);
        if (res === null) return;
        this.selectedList = res.data;
      },
      
      toDetail(index, item) {
        this.$router.push(`/detail/${item.id}`);
        console.log(item.id)
    },
     async addLike(item) {
      let params = {
        article_id: item.id
      };

      const res = await this.$http.get(`addLike`, params);

      if (res === null) return;
      this.getListData();
      // this.$message({
      //   message: "喜欢成功",
      //   type: "success"
      // });
    },
    },
    mounted() {
    this.getTagData();
    this.getListData();
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
</style>

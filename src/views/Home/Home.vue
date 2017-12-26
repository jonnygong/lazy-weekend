<template>
  <div>
    <!-- <mt-loadmore :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded" 
                     :bottomPullText='bottomText'
                     ref="loadmore"> -->
    <!--菜单-->
    <transition name="fade">
      <div class="menu" v-if="showMenu">

        <ul>

            <router-link to="/home" tag="li">首页</router-link>
            <router-link to="/personal" tag="li">修改个人资料</router-link>
            <router-link to="/liked" tag="li">我喜欢的活动</router-link>
            <router-link to="/about" tag="li">关于我们</router-link>
            <li to="/signin" @click="logout">退出登录</li>
        </ul>
      </div>
    </transition>

    <!--位置筛选-->
    <transition name="place" key="place">

<div class="area-wrapper"  ref="wrapper" v-if="showPlaceFilter" >
<div class="content">
        <div class="placeFilter">
          <!-- <mt-cell :title="item.area_name" ></mt-cell> -->
      <!-- <mt-index-section index="#"> -->
 <!-- <mt-cell :title="item.area_name" v-for="(item, index) in areaList"></mt-cell> -->
          <!-- <mt-cell ref="cell" 
          :title="item.area_name" 
          v-for="(item, index) in areaList" 
          :key="index" 
          @click="getAreaValue(item)"></mt-cell> -->

           <p
          v-for="(item, index) in areaList" 
          :key="index" 
          @click="getAreaValue(item, $event)">{{item.area_name}}</p>
        
      <!-- </mt-index-list></mt-index-section> -->
      </div>
      </div>
      </div>
    </transition>

    <!--搜索条-->
    <div class="top">

      <div @click="changeShowMenu">

        <img src="https://img.qianduanmei.com/2017/03/17/0019_line_logo.jpg" alt=""/>
      </div>

      <input class="search" type="text" ref="searchVal" placeholder="请输入文章标题关键字">
      <i class="fa fa-search fa-2x icon" @click="toSearch"></i>
      <!-- <button class="search" type="input"><i class="fa fa-search fa-2x"></i></button> -->
      <button @click="changeShowPlaceFilter">{{ currArea.area_name }}</button>
    </div>

      

    <!--轮播图-->
    <div class="carousel-wrap" id="carousel">
      <!-- 轮播图列表-->
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop"
            @mouseleave="go">
          <a :href="list.clickUrl">
            <img :src="list.cover" :alt="list.title">
          </a>
        </li>
      </transition-group>
      <!-- 轮播图位置指示-->
      <div class="carousel-items">
      <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" :key="index"
            @mouseover="change(index)"></span>
      </div>
    </div>

    <!--分类标签-->
    <div class="topType">
      <!-- <template scope="scope"> -->
      <ul>
        <!-- <li>
          <a href="#">
            <i class="fa fa-snowflake-o fa-3x"></i>
            <p>全部类目</p>
          </a>
        </li> -->
        <li v-for="(item,index) in typeList" :key="index"  @click="toLabel(item)">
          <a>
            <i :class="item.icon"></i>
            <p>{{ item.type }}</p>
          </a>
        </li>
      </ul>
      <!-- </template> -->
    </div>

    <!--筛选-->
    <div class="filter">
      <div class="filter_l" @click="toCity()">同城活动</div>
      <div class="filter_r">
        <div class="like" @click="toPopular()">最受欢迎</div>
        <div class="new" @click="toLabel('0')">最新活动</div>
      </div>
    </div>

    <!--本周精选-->
    <div class="selected">
      <h3>最新活动</h3>

        <!-- <LOADMORE> -->
          <!-- <ul>
      <li v-for="item in list">{{ item }}</li>
    </ul> -->
   
<div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <ul class="list">

          <li v-for="(item, index) in selectedList" :key="index">
          <img :src="item.cover" :alt="item.title"  @click="toDetail(item)"/>
          <p  @click="toDetail(item)" class="title">{{ item.title }}</p>
          <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
          <p class="time"><span>{{ item.time }}</span><span @click="addLike(item)">♡{{ item.like }}</span><span>￥{{ item.price }}</span></p>
        </li>
           
         

      </ul>

    </v-loadmore>

  </div>

      <!-- <ul > -->
         <!-- v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5" -->
        <!-- <li v-for="(item, index) in selectedList" :key="index">
          <img :src="item.cover" :alt="item.title"  @click="toDetail(item)"/>
          <p  @click="toDetail(item)" class="title">{{ item.title }}</p>
          <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
          <p class="time"><span>{{ item.time }}</span><span @click="addLike(item)">♡{{ item.like }}</span><span>￥{{ item.price }}</span></p>
        </li>
      </ul> -->
       <!-- <div slot="bottom" class="mint-loadmore-bottom">
      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
      <span v-show="bottomStatus === 'loading'">Loading...</span>
    </div> -->
      
        <!-- </LOADMORE> -->
    </div>
    <!-- </mt-loadmore> -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Loadmore } from "mint-ui";
// import LOADMORE from "../../components/loadMore/loadMore.vue";

export default {
  data() {
    return {
      currentIndex: 0,
      timer: "",
      loading: false,
      showMenu: false,
      showPlaceFilter: false,
      slideList: [],
      typeList: [],
      selectedList: [],
      areaList: [],
      scroll: null,
      currArea: {
        id: 0,
        area_name: ""
      },
      keyword: "",

     pageNo:1,
      pageSize:50,
      proCopyright:[],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage:0,
      loading:false,
      bottomText: '',
    };
  },
  methods: {
    go() {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    change(index) {
      this.currentIndex = index;
    },
    autoPlay() {
      this.currentIndex++;
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0;
      }
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.selectedList[this.selectedList.length - 1];
        for (let i = 1; i <= 5; i++) {
          this.selectedList.push(last + i);
        }
        this.loading = false;
      }, 500);
    },
    // loadBottom() {
    //   // ...// 加载更多数据
    //   this.allLoaded = true; // 若数据已全部获取完毕
    //   this.$refs.loadmore.onBottomLoaded();
    // },
    changeShowMenu() {
      this.showMenu = !this.showMenu;
    },
    changeShowPlaceFilter() {
      this.showPlaceFilter = !this.showPlaceFilter;
      // console.log(this.$ref.value);
      //        this.changeFixed(top, fixed);
      if (!this.showPlaceFilter) return;
      this.$nextTick(() => {
        // console.log(1);
        this.scroll = new BScroll(this.$refs.wrapper, {
          tap: true,
          click: true
        });
        // console.log(this.scroll);
        this.scroll.refresh();
      });
    },

    async getSlideList() {
      let params = {};
      const res = await this.$http.get("slideList", params);
      if (res === null) return;
      this.slideList = res.data;
    },
    async getNewList() {
      let params = {
        area: this.currArea.id,
        page: this.pageNo,
        size: 2
      };
      const res = await this.$http.get("articleList", params);
      if (res === null) return;
      this.selectedList = res.data;
    },
    async getTagList() {
      let params = {};
      const res = await this.$http.get("tagList", params);
      if (res === null) return;
      this.typeList = res.data;
      this.typeList.unshift({
        type: "全部分类",
        id: 0,
        icon: "fa fa-snowflake-o fa-3x",
        pid: 0
      });
    },
    async getAreaList() {
      let params = {};
      const res = await this.$http.get("areaList", params);
      if (res === null) return;
      this.areaList = res.data;
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {});
      //   this.scroll.refresh();
      // });
      this.currArea = this.areaList[0];
    },
    async addLike(item) {
      let params = {
        article_id: item.id
      };

      const res = await this.$http.get(`addLike`, params);

      if (res === null) return;
      this.getNewList();
      // this.$message({
      //   message: "喜欢成功",
      //   type: "success"
      // });
      this.$toast.show({
        text: "errmsg",
        position: "bottom"
      });
    },
    toLabel(item) {
      this.$router.push(`/label/${item.id}`);
      console.log(item.id);
    },
    toDetail(item) {
      this.$router.push(`/detail/${item.id}`);
      console.log(item.id);
    },
    toPopular() {
      // const popular = 1;
      this.$router.push({ name: "分类", params: { popular: 1 } });
    },
    toCity() {
      // const popular = 1;
      this.$router.push({ name: "分类", params: { area: this.currArea.id } });
    },
    toNew() {
      // const popular = 1;
      // this.$router.push({ name: "分类", params: { area_id: ${item.area_id} } });
      this.$router.push(`/label`);
    },
    toSearch() {
      // const popular = 1;
      this.keyword = this.$refs.searchVal.value;
      this.$router.push({ name: "分类", params: { keyword: this.keyword } });
    },
    logout() {
      sessionStorage.removeItem("JWT_TOKEN");
      sessionStorage.removeItem("IS_LOGIN");
      this.$router.push(`/`);
    },
    getAreaValue(item, event) {
      if (event._constructed) {
        console.log(item);
        this.currArea = item;
        this.showPlaceFilter = false;
        this.getNewList();
      }
    },
    loadBottom() {
      this.pageNo += 1;
      setTimeout(() => {
        let params = {
          area: this.currArea.id,
          page: this.pageNo,
          size: 2
        };
        const res = this.$http.get("articleList", params);
        if (res === null) return;
        if (res.data.length === 0) {
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
        } else {
          this.selectedList = this.selectedList.concat(res.data);
          this.$refs.loadmore.onBottomLoaded();
        }
      }, 500);
    },
    // handlebottomChange(status) {
    //   this.bottomStatus = status;
    // }
  },
  created() {
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    });
  },
  components: {
     'v-loadmore':Loadmore,
    // LOADMORE
  },
  mounted() {
    this.getSlideList();
    this.getNewList();
    this.getTagList();
    this.getAreaList();
  }
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
}

.area-wrapper {
  position: fixed;
  top: 3rem;
  left: 0;
  bottom: 0;
  right: 0;
  // height: 100vw;
  overflow: hidden;
  background-color: #fff;
  z-index: 100;
}
.placeFilter {
  pointer-events: auto;
  padding: 0 1.5rem;
  p {
    width: 100%;
    height: 3rem;
    // padding: 0.3rem 0.5rem 0.3rem 0;

    font-size: 1.5rem;
    line-height: 3rem;
    text-indent: 1rem;
    border-bottom: solid 1px #f2f2f2;
  }
}
.menu {
  width: 100%;
  height: 15rem;
  background-color: #3c424a;
  display: flex;
  flex-direction: column;

  li {
    width: 100%;
    height: 3rem;
    text-indent: 1rem;
    line-height: 3rem;
    color: #9b9b9b;
    a {
      color: #9b9b9b;
    }
    &:first-child {
      color: #fff;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  height: 0;
}

.place-enter-active,
.place-leave-active {
  transition: all 1s ease;
}

.place-enter,
.place-leave-to {
  transform: translateX(200%);
}

.top {
  width: 100%;
  height: 3rem;
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  // position: fixed;
  // top: 0;
  // z-index: 9999;

  img {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem 1rem;
  }
  .search {
    width: 100%;
    height: 2rem;
    background-color: #f2f2f2;
    text-indent: 1rem;
    color: #3c424a;
  }
  .icon {
    float: right;
    width: 3rem;
    height: 2rem;
    color: #999;
    position: absolute;
    top: 0.5rem;
    right: 3.5rem;
  }
  button {
    /*display: block;*/
    width: 5rem;
    height: 3rem;
    background-color: #fff;
  }
}

.carousel-wrap {
  position: relative;
  height: 15rem;
  width: 100%;
  overflow: hidden;
  // 删除
  background-color: #fff;
}

.slide-ul {
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.carousel-items {
  position: absolute;
  z-index: 10;
  top: 13rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color: #f2f2f2;
  }
}

.list-enter-active {
  transition: all 2s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 2s ease;
  transform: translateX(-100%);
}

.list-enter {
  transform: translateX(100%);
}

.list-leave {
  transform: translateX(0);
}

.topType {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  background-color: #fff;
  ul {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    li {
      display: flex;
      flex: 0 0 25%;
      justify-content: space-around;
      align-items: center;
      width: 6rem;
      height: 6rem;
      box-sizing: border-box;
      a {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 5rem;
        height: 5rem;
        color: #000;
        p {
          line-height: 1.6rem;
          color: #3c424a;
        }
        i {
          color: #9b9b9b;
        }
      }
    }
  }
}

.filter {
  width: 100%;
  height: 100%;
  padding: 1rem 0 1rem 0;
  margin: 1rem 0;
  display: flex;
  flex: 1;
  justify-content: space-around;
  background-color: #fff;
  color: #3c424a;
  font-size: 18px;
  .filter_l {
    height: 13rem;
    display: flex;
    flex: 0 0 50%;
    justify-content: space-around;
    align-items: center;
    background-color: #98d083;
    margin: 0 1rem;
  }

  .filter_r {
    display: flex;
    flex-direction: column;
    width: 13rem;
    /*height: 13rem;*/
    margin-right: 1rem;

    .like {
      width: 13rem;
      display: flex;
      flex: 0 1 50%;
      justify-content: space-around;
      align-items: center;
      background-color: #bcfcc9;
      margin-bottom: 0.5rem;
    }

    .new {
      width: 13rem;
      display: flex;
      flex: 0 1 50%;
      justify-content: space-around;
      align-items: center;
      background-color: #f2feca;
      margin-top: 0.5rem;
    }
  }
}

.selected {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: -0.5rem;
  li {
    padding: 1rem 0;
    border-bottom: 1px solid #f2f2f2;
    &:first-child {
      padding-top: 0;
    }
  }
  h3 {
    font-size: 18px;
    text-align: center;
    padding-top: 1rem;
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

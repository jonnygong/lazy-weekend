<template>
  <div>
    <!--菜单-->
    <transition name="fade">
      <div class="menu" v-if="showMenu">

        <ul>

            <router-link to="/home" tag="li">首页</router-link>
            <router-link to="/personal" tag="li">修改个人资料</router-link>
            <router-link to="/liked" tag="li">我喜欢的活动</router-link>
            <router-link to="/about" tag="li">关于我们</router-link>
            <router-link to="/signin" tag="li">退出登录</router-link>
        </ul>
      </div>
    </transition>

    <!--位置筛选-->
    <transition name="place" key="place">
      <mt-index-list class="placeFilter" v-if="showPlaceFilter">
        <mt-index-section index="A">
          <mt-cell title="Aaron"></mt-cell>
          <mt-cell title="Alden"></mt-cell>
          <mt-cell title="Austin"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="Baldwin"></mt-cell>
          <mt-cell title="Braden"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="Baldwin"></mt-cell>
          <mt-cell title="Braden"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="Baldwin"></mt-cell>
          <mt-cell title="Braden"></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell title="Baldwin"></mt-cell>
          <mt-cell title="Braden"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Z">
          <mt-cell title="Zack"></mt-cell>
          <mt-cell title="Zane"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </transition>

    <!--搜索条-->
    <div class="top">

      <div @click="changeShowMenu">

        <img src="https://img.qianduanmei.com/2017/03/17/0019_line_logo.jpg" alt=""/>
      </div>


      <button class="search" type="input"><i class="fa fa-search fa-2x"></i></button>
      <button @click="changeShowPlaceFilter">杭 州</button>
    </div>

    <!--轮播图-->
    <div class="carousel-wrap" id="carousel">
      <!-- 轮播图列表-->
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop"
            @mouseleave="go">
          <a :href="list.clickUrl">
            <img :src="list.image" :alt="list.desc">
          </a>
        </li>
      </transition-group>
      <!-- 轮播图位置指示-->
      <div class="carousel-items">
      <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}"
            @mouseover="change(index)"></span>
      </div>
    </div>

    <!--分类标签-->
    <div class="topType">
      <ul>
        <li v-for="(item,index) in typeList" :key="index">
          <a :href="item.clickUrl">
            <i :class="item.icon"></i>
            <p>{{ item.label }}</p>
          </a>
        </li>
      </ul>
    </div>

    <!--筛选-->
    <div class="filter">
      <div class="filter_l">附近活动</div>
      <div class="filter_r">
        <div class="like">你会喜欢</div>
        <div class="new">最新活动</div>
      </div>
    </div>

    <!--本周精选-->
    <div class="selected">
      <h3>本周精选</h3>
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5">
        <li v-for="(item, index) in selectedList">
          <img :src="item.img" :alt="item.title"/>
          <p class="title">{{ item.title }}</p>
          <p class="place"><span>{{ item.place }}</span>·<span>{{ item.type }}</span></p>
          <p class="time"><span>{{ item.time }}</span><span>{{ item.like }}</span><span>{{ item.price }}</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        currentIndex: 0,
        timer: '',
        loading: false,
        showMenu: false,
        showPlaceFilter: false,
        slideList: [
          {
            clickUrl: "#",
            desc: "nhwc",
            image: "http://dummyimage.com/1745x492/f1d65b"
          },
          {
            clickUrl: "#",
            desc: "hxrj",
            image: "http://dummyimage.com/1745x492/40b7ea"
          },
          {
            clickUrl: "#",
            desc: "rsdh",
            image: "http://dummyimage.com/1745x492/e3c933"
          }
        ],
        typeList: [
          {
            clickUrl: '#',
            label: '全部类目',
            icon: 'fa  fa-snowflake-o fa-3x',
          },
          {
            clickUrl: '#',
            label: '文艺生活',
            icon: 'fa fa-leaf fa-3x',
          },
          {
            clickUrl: '#',
            label: '户外活动',
            icon: 'fa fa-binoculars fa-3x',
          },
          {
            clickUrl: '#',
            label: 'DIY手作',
            icon: 'fa fa-child fa-3x',
          },
          {
            clickUrl: '#',
            label: '排队聚会',
            icon: 'fa fa-glass fa-3x',
          },
          {
            clickUrl: '#',
            label: '运动健身',
            icon: 'fa fa-bicycle fa-3x',
          },
          {
            clickUrl: '#',
            label: '茶会雅集',
            icon: 'fa fa-coffee fa-3x',
          },
          {
            clickUrl: '#',
            label: '沙龙学堂',
            icon: 'fa fa-language fa-3x',
          },
        ],
        selectedList: [
          {
            title: '一杯红酒，一部电影，把我的故事讲给懂的人听！',
            img: 'http://dummyimage.com/1745x492/e3c933',
            place: '温妮红酒线下体验店',
            type: '主题聚会',
            time: '每周五 19：30',
            like: '♡21',
            price: '￥68',
          },
          {
            title: '一杯红酒，一部电影，把我的故事讲给懂的人听！',
            img: 'http://dummyimage.com/1745x492/e3c933',
            place: '温妮红酒线下体验店',
            type: '主题聚会',
            time: '每周五 19：30',
            like: '♡21',
            price: '￥68',
          },
          {
            title: '一杯红酒，一部电影，把我的故事讲给懂的人听！',
            img: 'http://dummyimage.com/1745x492/e3c933',
            place: '温妮红酒线下体验店',
            type: '主题聚会',
            time: '每周五 19：30',
            like: '♡21',
            price: '￥68',
          },
        ],
      }


    },
    methods: {
      go() {
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 4000)
      },
      stop() {
        clearInterval(this.timer)
        this.timer = null
      },
      change(index) {
        this.currentIndex = index
      },
      autoPlay() {
        this.currentIndex++
        if (this.currentIndex > this.slideList.length - 1) {
          this.currentIndex = 0
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
        }, 2500);
      },
      changeShowMenu() {
        this.showMenu = !this.showMenu;
      },
      changeShowPlaceFilter() {
        this.showPlaceFilter = !this.showPlaceFilter;
//        this.changeFixed(top, fixed);
      },
//      hasClass(elements, cName){
//        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
//      },
//      changeFixed() {
//        if (this.showPlaceFilter) {
//          if (!this.hasClass(elements, cName)) {
//            elements.className += " " + cName;
//          }
//          ;
//        } else {
//          elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
//        }
//      },
    },
    created() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 4000)
      })
    }
  }
</script>

<style lang="scss">
  .fixed {
    position: fixed;
    top: 0;
  }

  .placeFilter {
    position: fixed;
    top: 3rem;
    z-index: 9999;
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

  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    height: 0;
  }

  .place-enter-active, .place-leave-active {
    transition: all 2s ease;
  }

  .place-enter, .place-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    transform: translateX(200%)
  }

  .top {
    width: 100%;
    height: 3rem;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    /*position: absolute;*/
    /*top: 0;*/
    /*z-index: 9999;*/

    img {
      width: 2rem;
      height: 2rem;
      margin: 0.5rem 1rem;
    }
    .search {
      width: 100%;
      height: 2rem;
      background-color: #f2f2f2;
      i {
        float: right;
        wdith: 3rem;
        height: 2rem;
        color: #999;
      }
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
    transform: translateX(0)
  }

  .list-leave-active {
    transition: all 2s ease;
    transform: translateX(-100%)
  }

  .list-enter {
    transform: translateX(100%)
  }

  .list-leave {
    transform: translateX(0)
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
        background-color: #BCFCC9;
        margin-bottom: 0.5rem;
      }
      .new {
        width: 13rem;
        display: flex;
        flex: 0 1 50%;
        justify-content: space-around;
        align-items: center;
        background-color: #F2FECA;
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

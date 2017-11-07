<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  // 插入混合以及变量
  @import "~scss_vars";
  // body reset
  body, html, div, span, p, a, ul, li {
    margin: 0;
    padding: 0;
  }

  input, button {
    border: 0;
    outline: none;
  }

  body, html {
    width: 100%;
    font-family: -apple-system-font, "Microsoft YaHei", sans-serif, "Helvetica Neue";
    // 处理自适应
    font-size: calc(100vw / #{375 / $rem});
    // 点击白框
    -webkit-tap-highlight-color: rgba(#fff, 0);
    // 全局背景
    background-color: #f2f2f2;
    overflow-x: hidden;
    // color
    color: #3c424a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    // 取消链接下划线
    text-decoration: none;
    // 默认链接颜色
    // color: $primaryColor;

  }

  li {
    list-style: none;
  }

  img {
    // 图片放超出
    width: 100%;

  }
</style>

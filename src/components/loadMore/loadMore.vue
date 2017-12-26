<template>
  <mt-loadmore :bottom-method="loadBottomUse"
                     :bottom-all-loaded="allUseLoad" :bottomPullText='bottomText'
                     ref="loadmore">
          <!-- <div class="tab-list" v-for='item in useScoreLog'>
            <div class="tab-list-top">
              <span class="tab-name">{{item.remark}}</span>
              <span class="tab-num">{{item.score}}</span>
            </div>
            <div class="tab-list-bottom">
              <span class="tab-time">{{item.operateTime}}</span>
              <span class="tab-class">{{item.recordTypeName}}</span>
            </div>
          </div> -->
        </mt-loadmore>
</template>
<script>
import {Indicator, Loadmore} from 'mint-ui';
export default {
     name: 'LOADMORE',
   data() {
      return {
         getScoreLog: [],
        pageNo: 1,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        totalCount: '',
      };
    },
    methods: {
    //  getData(){
    //     this.$http.post(commonUrl + "/restful/", {
    //       typeFlag: '1'
    //     }).then(response => {
    //       if (response.data.errcode == 0) {
    //         this.getScoreLog = response.data.scoreLog;
    //         this.totalGetCount = (response.data.recordCount + 9) / 10;
    //       }
    //     }, response => {
    //     });
    //   },
      loadBottom() {
        this.pageNo += 1;
        if (this.pageNo == this.totalGetCount) {
          this.allLoaded = true;
        }
        setTimeout(() => {
          this.$http.post(commonUrl + "/restful/", {
            pageNo: this.pageNo,
            typeFlag: '1'
          }).then(response => {
            if (response.data.errcode == 0) {
              this.getScoreLog = this.getScoreLog.concat(response.data.scoreLog);
            }
          }, response => {
          });
        }, 1500);
      },
    },
     components: {
    Loadmore,
    Indicator
  },
    mounted() {
      // this.getData();
    }

}
</script>
<style lang="scss" scoped>


</style>

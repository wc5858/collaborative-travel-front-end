<template>
  <div class="page">
    <i-card
      full="true"
      v-bind:title="'活动' +item.qname+'的准备详情'"
    >
      <view slot="content">{{item.preparation.title}}</view>
      <view slot="footer">{{item.preparation.dsc}}</view>
    </i-card>
    <button class="share" open-type="share">
      <i-icon type="share" size="45" color="#fff"/>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tid: 0,
      item: {}
    };
  },
  onShareAppMessage(res) {
    return {
      title: '活动' +this.item.qname+'的准备详情' + ",快来看看吧",
      path: "/pages/preparation/main?tid=" + this.tid
    };
  },
  onLoad(options) {
    this.tid = options.tid;
  },
  onShow() {
    this.item = wx.getStorageSync("travels")[this.tid];
  },
  methods: {
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}
ul {
  overflow: hidden;
}
.list {
  position: relative;
  margin: 20rpx 0;
}
.share {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  height: 140rpx;
  width: 140rpx;
  border-radius: 100%;
  box-shadow: 0 10rpx 30rpx 6rpx #999;
  background: #73116f;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .focus-user {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
} */
</style>

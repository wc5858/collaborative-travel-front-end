<template>
  <div class="page">
    <i-cell-group>
      <i-cell
        v-for="(item, itemIndex) in cards"
        v-bind:key="itemIndex"
        v-bind:title="item.title"
        is-link
        v-bind:url="'/pages/que/main?qid=' + item.qid"
      ></i-cell>
    </i-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: []
    };
  },
  onShow() {
    let info = wx.getStorageSync('info')
      this.$callApi("GET",'question/' + info.uid +'/getFollowQuestion').then(res=>{
        this.cards = res;
      }).catch(e=>{
        console.log(e)
      })
  },
  methods: {}
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
  margin: 20rpx 0;
}
</style>

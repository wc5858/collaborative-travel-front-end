<template>
  <div class="page">
    <i-cell-group>
      <i-cell
        v-for="(item, itemIndex) in cards"
        v-bind:key="itemIndex"
        v-bind:title="item.title"
        v-bind:url="'/pages/que/main?qid=' + item.qid"
        @click="goQuestion(item.qid)"
      >
      <div slot="footer">
        <i-switch v-bind:value="!item.state" size="large" @change.stop="onChange(itemIndex)">
            <view slot="open">开启</view>
            <view slot="close">关闭</view>
        </i-switch>
      </div>
      </i-cell>
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
    this
      .$callApi("GET",'question/' + info.uid +'/getByUserId')
      .then(res => {
        this.cards = res;
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    goQuestion(qid) {
      wx.navigateTo({
        url: '/pages/que/main?qid=' + qid
      })
    },
    onChange(idx){
      this.cards[idx].state = !this.cards[idx].state
      this
      .$callApi("GET",'question/' + this.cards[idx].qid +(this.cards[idx].state ?'/closeQuestion':'/openQuestion'))
      .then(res => {
        console.log('操作成功')
      })
      .catch(res => {
        console.log(res);
      });
    }
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
  margin: 20rpx 0;
}
</style>

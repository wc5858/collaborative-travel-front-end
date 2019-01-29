<template>
  <div class="page">
    <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex">
        {{item.value}}
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
          extra="回复了你"
          @click="goAnswer(itemIndex)"
        >
          <view slot="content">{{item.content}}</view>
          <!-- <view slot="footer">{{item.answer}}</view> -->
        </i-card>
      </li>
    </ul>
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
    let uid = wx.getStorageSync('info').uid
    this.$callApi("GET",'comment/' + uid +'/getReceivedComment').then(res=>{
        this.cards=res
      })
  },
  methods: {
    goAnswer(i){
      wx.navigateTo({
        url: '/pages/ans/main?aid=' + this.cards[i].aid
      })
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

<template>
  <div class="page">
    <i-panel hide-top="true">
      <i-cell v-bind:title="que.title" v-bind:label="que.content">
        <i-switch v-bind:value="state" @change="onChange" slot="footer" size="large">
            <view slot="open">关注</view>
            <view slot="close">取消</view>
        </i-switch>
      </i-cell>
    </i-panel>
    <view v-if="!on" style="text-align:center;color:#666;">该问题已关闭</view>
    <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex" @click="goAnswer(itemIndex)">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{item.content}}</view>
        </i-card>
      </li>
    </ul>
    <div class="add" @click="newAnswer" v-if="on">
      <i-icon type="add" size="45" color="#fff" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qid: 0,
      state: 0,
      que: {
        content: "",
        title: "2",
        qid: 0
      },
      cards: [],
      on: true
    };
  },
  onLoad(options) {
    this.qid = options.qid;
  },
  onShow() {
    let uid = wx.getStorageSync('info').uid
    this.$callApi("GET", 'user/' + uid + '/' + this.qid + '/checkFollowQuestion').then(res => {
      this.state = res.state != 0
    })
    this.$callApi("GET", 'question/' + this.qid + '/getById').then(res => {
      this.on = res.state == 0
      this.que = res
    })
    this.$callApi("GET", 'answer/' + this.qid + '/getByQuestionId').then(res => {
      this.cards = res;
    })
  },
  methods: {
    goAnswer(i) {
      wx.navigateTo({
        url: '/pages/ans/main?aid=' + this.cards[i].aid
      })
    },
    onChange() {
      this.$callApi("GET", 'user/' + wx.getStorageSync('info').uid + '/' + this.qid + (this.state ? '/removeFollowQuestion' : '/addFollowQuestion')).then(res => {
        console.log('操作成功')
        this.state = !this.state
      }).catch(e => {
        console.log(e)
      })
    },
    // focusUser(){

    // },
    newAnswer() {
      wx.navigateTo({
        url: '/pages/newa/main?qid=' + this.qid
      })
    },
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
.add {
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

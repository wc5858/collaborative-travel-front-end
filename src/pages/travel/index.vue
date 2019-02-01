<template>
  <div class="page">
    <i-card
      full="true"
      v-bind:title="item.qname"
      v-bind:thumb="item.avatar"
      v-bind:extra="item.status || '进行中'"
    >
      <view slot="content">{{'发起人：' +item.uname}}</view>
      <view slot="footer">{{item.qnamedsc}}</view>
    </i-card>
    <!-- <view style="text-align:center;color:#666;">{{on?"进行中":"已结束"}}</view> -->
    <!-- <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex" @click="goAnswer(itemIndex)">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{item.content}}</view>
        </i-card>
      </li>
    </ul>-->
    <div v-if="show">
      <i-button type="info" @click="modifyTravel">编辑出游</i-button>
    </div>
    <div v-if="!item.hasVote">
      <i-button type="info" @click="newvote">发起投票</i-button>
    </div>
    <div v-else>
      <i-button type="info" @click="vote">参与投票</i-button>
    </div>
    <div v-if="!added">
      <i-button type="info" @click="addTravel">加入出游</i-button>
    </div>
    <div style="text-align:center" v-else>
      已加入
    </div>
    <div>
      <i-button type="info" @click="setReminder">设置提醒</i-button>
    </div>
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
      state: 0,
      show: true,
      que: {
        content: "",
        title: "2",
        tid: 0
      },
      cards: [],
      on: true,
      item: {},
      added: false
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: (this.item.title || "我发起了出游活动") + ",快来加入吧",
      path: "/page/travel?tid=" + this.tid
    };
  },
  onLoad(options) {
    this.tid = options.tid;
  },
  onShow() {
    this.item = wx.getStorageSync("travels")[this.tid];
    let adds = wx.getStorageSync("adds");
    if(adds.includes(this.tid)) {
      this.added = true
    }
    // let uid = wx.getStorageSync('info').uid
    // this.$callApi("GET", 'user/' + uid + '/' + this.tid + '/checkFollowQuestion').then(res => {
    //   this.state = res.state != 0
    // })
    // this.$callApi("GET", 'question/' + this.tid + '/getById').then(res => {
    //   this.on = res.state == 0
    //   this.que = res
    // })
    // this.$callApi("GET", 'answer/' + this.tid + '/getByQuestionId').then(res => {
    //   this.cards = res;
    // })
  },
  methods: {
    // goAnswer(i) {
    //   wx.navigateTo({
    //     url: '/pages/ans/main?aid=' + this.cards[i].aid
    //   })
    // },
    // onChange() {
    //   this.$callApi("GET", 'user/' + wx.getStorageSync('info').uid + '/' + this.tid + (this.state ? '/removeFollowQuestion' : '/addFollowQuestion')).then(res => {
    //     console.log('操作成功')
    //     this.state = !this.state
    //   }).catch(e => {
    //     console.log(e)
    //   })
    // },
    // focusUser(){

    // },
    addTravel(){
      this.added = true
      let adds = wx.getStorageSync("adds")||[];
      adds.push(this.tid)
      wx.setStorage({
        key: 'adds',
        data: adds
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    },
    setReminder(){
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    },
    modifyTravel() {
      wx.navigateTo({
        url: "/pages/newtravel/main?tid=" + this.tid
      });
    },
    newvote() {
      wx.navigateTo({
        url: "/pages/newvote/main?tid=" + this.tid
      });
    },
    vote() {
      wx.navigateTo({
        url: "/pages/vote/main?tid=" + this.tid
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

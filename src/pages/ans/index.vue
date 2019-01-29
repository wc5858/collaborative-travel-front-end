<template>
  <div class="page">
    <div class="focus-user">
          <i-switch v-bind:value="state" @change.stop="onChange" slot="footer" size="large">
            <view slot="open">关注</view>
            <view slot="close">取消</view>
          </i-switch>
        </div>
    <i-panel hide-top="true">
      <i-card
          full="true"
          v-bind:title="ans.user.name"
          v-bind:thumb="ans.user.pictureurl"
        >
        <view slot="content">{{ans.content}}</view>
        <view slot="footer">
          <div class="line" @click="goQuestion">返回到问题</div>
        </view>
      </i-card>
    </i-panel>
    <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{item.content}}</view>
        </i-card>
      </li>
    </ul>
    <div class="add" @click="newComment">
      <i-icon type="add" size="45" color="#fff" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aid: 0,
      state: 0,
      ans:{
        user:{}
      },
      cards: []
    };
  },
  onLoad(options) {
    this.aid = options.aid;
    let uid = wx.getStorageSync('info').uid
    this.$callApi("GET",'answer/' + options.aid +'/getById').then(res=>{
        this.ans=res
        this.$callApi("GET",'user/' +uid+'/'+ this.ans.uid +'/checkFollowUser').then(res=>{
          this.state=res.state != 0
        })
      })
    this.$callApi("GET",'comment/' + options.aid +'/getByAnswerId').then(res=>{
      this.cards = res;
    })
  },
  methods: {
    goQuestion(qid) {
      wx.navigateTo({
        url: '/pages/que/main?qid=' + this.ans.qid
      })
    },
    onChange(){
      this.$callApi("GET",'user/' + wx.getStorageSync('info').uid + '/' + this.ans.uid +(this.state ? '/removeFollowUser' : '/addFollowUser')).then(res=>{
        console.log('操作成功')
        this.state = !this.state
      }).catch(e=>{
        console.log(e)  
      })
    },
    newComment() {
      wx.navigateTo({
        url: '/pages/newc/main?aid=' + this.aid
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
.focus-user {
  position: absolute;
  right: 20rpx;
  top: 32rpx;
  z-index: 1;
}
.line {
  text-align: center;
  padding-top: 10rpx;
  width: 375rpx;
  margin: 0 auto;
  border-top: 1px solid #eee;
}
</style>

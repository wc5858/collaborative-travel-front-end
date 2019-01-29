<template>
  <div class="page">
    <div>
      <view class="avatar-bg-box">
        <image class="avatar-bg" mode="scaleToFill" src="/static/imgs/bg.jpg" />
        <view class="user-name">{{name}}</view>
      </view>
      <image class="avatar" mode="aspectFill" v-bind:src="avatar" />
    </div>
    <div class="mine-content">
      <div v-if="show">
        <i-button open-type="getUserInfo" @getuserinfo="onGotUserInfo" type="info">点击登陆</i-button>
      </div>
      <div class="mine-info" v-else>
        <i-panel>
          <i-cell-group>
            <i-cell title="我关注的用户" is-link url="/pages/fou/main"></i-cell>
            <i-cell title="我关注的问题" is-link url="/pages/foq/main"></i-cell>
            <i-cell title="我的问题" is-link url="/pages/myq/main"></i-cell>
            <i-cell title="我的回答" is-link url="/pages/mya/main"></i-cell>
          </i-cell-group>
        </i-panel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      name: "未登录",
      show: false,
      avatar: "/static/imgs/avatar.jpg"
    };
  },
  methods: {
    getUserInfo() {
      wx.getUserInfo({
        success: res => {
          this.name = res.userInfo.nickName;
          this.avatar = res.userInfo.avatarUrl;
          this.updateUserinfo()
          this.show = false
        },
        fail: () => {
          this.show = true;
        }
      });
    },
    onGotUserInfo() {
      this.getUserInfo()
    },
    updateUserinfo(){
      let info = wx.getStorageSync('info')
      this.$callApi("POST",'user/' + info.uid +'/addUserInfo',
        {
          name:this.name,
          pictureurl: this.avatar
        }
      )
    }

  },
  onShow() {
    this.getUserInfo();
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}
.avatar-bg-box {
  position: relative;
  height: 450rpx;
}
.avatar-bg {
  width: 100%;
  height: 100%;
}
.avatar {
  position: absolute;
  height: 208rpx;
  width: 208rpx;
  border: 8rpx solid #fff;
  top: 300rpx;
  right: 40rpx;
}
.mine-content {
  margin-top: 100rpx;
}
.user-name {
  position: absolute;
  bottom: 16rpx;
  right: 280rpx;
  color: white;
}
</style>

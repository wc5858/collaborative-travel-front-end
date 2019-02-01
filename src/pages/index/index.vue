<template>
  <div class="page">
    <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex" @click="goTravel(item.id)">
        <i-card
          full="true"
          v-bind:title="item.qname"
          v-bind:thumb="item.avatar"
          v-bind:extra="item.status || '进行中'"
        >
          <view slot="content">{{'发起人：' +item.uname}}</view>
          <view slot="footer">{{item.qnamedsc}}</view>
        </i-card>
      </li>
    </ul>
    <div class="add" @click="newTravel">
      <i-icon type="add" size="45" color="#fff" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: 0,
      cards: []
    };
  },

  methods: {
    load() {
      let uid = this.uid
      // 取假数据
      this.cards = wx.getStorageSync('travels') || []
      // this.$callApi("GET",'answer/' + uid +'/getFollowUserAnswer').then(res=>{
      //   this.cards=res
      // })
    },
    goTravel(i){
      wx.navigateTo({
        url: '/pages/travel/main?tid=' + i
      })
    },
    newTravel() {
      wx.navigateTo({
        url: '/pages/newtravel/main'
      })
    },
    login() {
      wx.getStorage({
        key: "info",
        success:res=> {
          console.log(res.data)
          this.load(res.data.uid)
        },
        fail:()=> {
          // 调用登录接口
          wx.login({
            success: res => {
              if (res.code) {
                this
                  .$callApi("POST", "user/login", {
                    code: res.code
                  })
                  .then(res => {
                    this.load(res.uid)
                    wx.setStorage({
                      key: 'info',
                      data: {
                        openid: res.openid,
                        uid: res.uid
                      }
                    })
                  })
                  .catch(res => {
                    console.log(res);
                  });
              } else {
                console.log("登录失败！" + res.errMsg)
              }
            }
          });
        }
      });
    }
  },
  onLoad() {
    let uid = wx.getStorageSync('info').uid
    if(uid) {
      this.uid = uid
      this.load()
    }
  },
  onShow() {
    this.load()
  },
  created() {
    this.login();
  }
};
</script>

<style scoped>
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
</style>

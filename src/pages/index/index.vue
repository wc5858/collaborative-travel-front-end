<template>
  <div class="page">
    <ul>
      <li
        class="list"
        v-for="(item, itemIndex) in cards"
        v-bind:key="itemIndex"
        @click="goTravel(item.id)"
      >
        <div class="list-travel">
          <div class="travel-top">
            <div class="travel-avatar">
              <img v-bind:src="item.avatar">
            </div>
            <div class="travel-info">
              <p class="travel-title">{{item.title}}</p>
              <p class="travel-publisher">发起人：{{item.uname}}</p>
            </div>
          </div>
          <div class="travel-dsc">{{item.dsc}}</div>
          <div class="travel-bottom">
            <div class="travel-date">
              <i-icon type="clock" size="20" color="#666"/>
              <span>{{item.date}}</span>
            </div>
            <div class="travel-num">
              <i-icon type="group" size="20" color="#666"/>
              <span>{{item.num}}人</span>
            </div>
            <div class="travel-status">
              <div class="icon-status">
                <div></div>
              </div>
              <span>{{item.status}}</span>
            </div>
          </div>
          <div class="travel-enter">
            <i-icon type="enter" size="40" color="#666"/>
          </div>
        </div>
      </li>
    </ul>
    <div class="add" @click="newTravel">
      <i-icon type="add" size="45" color="#fff"/>
    </div>
  </div>
</template>

<script>
function dealDate(d) {
  const data = new Date(d);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
export default {
  data() {
    return {
      uid: 0,
      cards: []
    };
  },
  methods: {
    load() {
      let uid = this.uid;
      // 取假数据
      // this.cards = wx.getStorageSync('travels') || []
      // this.$callApi("GET",'answer/' + uid +'/getFollowUserAnswer').then(res=>{
      //   this.cards=res
      // })
      this.cards = [
        {
          id: 0,
          avatar: "/static/imgs/avatar.jpg",
          title: "出游地点",
          uname: "xxx",
          dsc: "描述",
          date: dealDate(new Date()),
          num: 5,
          status: "召集中"
        },
        {
          id: 1,
          avatar: "/static/imgs/avatar.jpg",
          title: "出游地点",
          uname: "xxx",
          dsc: "描述",
          date: dealDate(new Date()),
          num: 5,
          status: "召集中"
        }
      ];
    },
    goTravel(i) {
      wx.navigateTo({
        url: "/pages/travel/main?tid=" + i
      });
    },
    newTravel() {
      wx.navigateTo({
        url: "/pages/newtravel/main"
      });
    },
    login() {
      wx.getStorage({
        key: "info",
        success: res => {
          console.log(res.data);
          this.load(res.data.uid);
        },
        fail: () => {
          // 调用登录接口
          wx.login({
            success: res => {
              if (res.code) {
                this.$callApi("POST", "user/login", {
                  code: res.code
                })
                  .then(res => {
                    this.load(res.uid);
                    wx.setStorage({
                      key: "info",
                      data: {
                        openid: res.openid,
                        uid: res.uid
                      }
                    });
                  })
                  .catch(res => {
                    console.log(res);
                  });
              } else {
                console.log("登录失败！" + res.errMsg);
              }
            }
          });
        }
      });
    }
  },
  onLoad() {
    let uid = wx.getStorageSync("info").uid;
    if (uid) {
      this.uid = uid;
      this.load();
    }
  },
  onShow() {
    this.load();
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
.add {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  height: 140rpx;
  width: 140rpx;
  border-radius: 100%;
  box-shadow: 0 10rpx 30rpx 6rpx #666;
  background: #6a2c70;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-travel {
  position: relative;
  margin: 20rpx;
  padding: 35rpx;
  background: white;
  border-radius: 10rpx;
}
.travel-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
}
.travel-avatar img {
  width: 100%;
  height: 100%;
}
.travel-top {
  display: flex;
}
.travel-info {
  margin-left: 30rpx;
}
.travel-title {
  color: #6a2c70;
  font-size: 40rpx;
}
.travel-publisher {
  color: black;
  font-size: 24rpx;
}
.travel-dsc {
  margin: 30rpx 0;
  color: black;
  font-size: 28rpx;
}
.travel-bottom {
  display: flex;
  align-items: center;
}
.travel-date,
.travel-num,
.travel-status {
  display: flex;
  align-items: center;
  font-size: 20rpx;
  color: #666;
}
.travel-bottom span {
  margin-left: 0.5em;
}
.travel-num {
  margin-left: 3em;
  flex-grow: 1;
}
.icon-status {
  width: 30rpx;
  height: 30rpx;
  border: 5rpx solid #c0c015;
  border-radius: 50%;
  box-sizing: border-box;
}
.icon-status > div {
  height: 20rpx;
  width: 20rpx;
  background: #c0c015;
  border: 5rpx solid white;
  border-radius: 50%;
  box-sizing: border-box;
}
.travel-enter {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translate(0, -50%);
}
</style>

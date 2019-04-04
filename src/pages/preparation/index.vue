<template>
  <div class="page">
    <div class="team">
      <div class="team-operation">管理</div>
      <div class="team-title">团队成员</div>
      <ul class="team-members">
        <li v-for="(item, idx) in team" v-bind:key="idx">
          <img v-bind:src="item.avatar">
        </li>
        <li v-if="added" class="team-invite">
          <i-icon type="add" size="28" color="#999"/>
        </li>
      </ul>
    </div>
    <ul class="travel-info">
      <li class="info-item">
        <span class="info-label">出游计划名称</span>
        <span class="info-value">{{data.title}}</span>
      </li>
      <li class="info-item">
        <span class="info-label">出游时间</span>
        <span class="info-value">{{data.date}}</span>
      </li>
      <li class="info-item">
        <span class="info-label">集结地</span>
        <span class="info-value">{{data.aggregate}}</span>
      </li>
      <li class="info-item">
        <span class="info-label">目的地</span>
        <span class="info-value">{{data.destination}}</span>
      </li>
    </ul>
    <div class="page-label">准备事项</div>
    <ul class="travel-list">
      <li class="list-item">
        <div class="item-left">
          <div class="item-select"></div>
        </div>
        <div class="item-right">
          <p class="right-title">准备事项名</p>
          <p class="right-detail">详细内容</p>
        </div>
      </li>
    </ul>
    <div class="add" @click="newPreparation">
      <i-icon type="add" size="45" color="#fff"/>
    </div>
    <div v-if="started" class="page-btn btn-red" @click="addTravel">完成出游</div>
    <div v-else class="page-btn btn-red" @click="addTravel">开始出游</div>
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
      tid: 0,
      started: false,
      team: [
        {
          avatar: "/static/imgs/avatar.jpg"
        },
        {
          avatar: "/static/imgs/avatar.jpg"
        }
      ],
      data: {
        id: 0,
        avatar: "/static/imgs/avatar.jpg",
        title: "出游地点",
        uname: "xxx",
        dsc:
          "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        date: dealDate(new Date()),
        num: 5,
        aggregate: "费楼",
        destination: "xxx0",
        status: "召集中"
      }
      // state: 0,
      // show: true,
      // que: {
      //   content: "",
      //   title: "2",
      //   tid: 0
      // },
      // cards: [],
      // on: true,
      // item: {},
      // added: false
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button" && res.target.id === "share") {
      // 转发travel
      return {
        title: (this.item.title || "我发起了出游活动") + ",快来加入吧",
        path: "/pages/travel/main?tid=" + this.tid
      };
    }
  },
  onLoad(options) {
    this.tid = options.tid;
    this.added = this.tid == 0;
  },
  onShow() {
    // this.item = wx.getStorageSync("travels")[this.tid];
    // let adds = wx.getStorageSync("adds");
    // if(adds.includes(this.tid)) {
    //   this.added = true
    // }
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
    newPreparation() {
      wx.navigateTo({
        url: "/pages/newpreparation/main?tid=" + this.tid
      });
    },
    goMap() {
      wx.navigateTo({
        url: "/pages/map/main?tid=" + this.tid
      });
    },
    goFee() {
      wx.navigateTo({
        url: "/pages/fee/main?tid=" + this.tid
      });
    },
    goMood() {
      wx.navigateTo({
        url: "/pages/mood/main?tid=" + this.tid
      });
    },
    goReport() {
      wx.navigateTo({
        url: "/pages/report/main?tid=" + this.tid
      });
    },
    // onChange() {
    //   this.$callApi("GET", 'user/' + wx.getStorageSync('info').uid + '/' + this.tid + (this.state ? '/removeFollowQuestion' : '/addFollowQuestion')).then(res => {
    //     console.log('操作成功')
    //     this.state = !this.state
    //   }).catch(e => {}
    //     console.log(e)
    //   })
    // },
    // focusUser(){

    // },
    addTravel() {
      this.added = true;
      // let adds = wx.getStorageSync("adds") || [];
      // adds.push(this.tid);
      // wx.setStorage({
      //   key: "adds",
      //   data: adds
      // });
      // wx.showToast({
      //   title: "成功",
      //   icon: "success",
      //   duration: 2000
      // });
    },
    setReminder() {
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000
      });
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
    addPreparation() {
      wx.navigateTo({
        url: "/pages/newpreparation/main?tid=" + this.tid
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
  overflow: hidden;
}
.page-label {
  margin: 20rpx;
  background: #85378d;
  font-size: 24rpx;
  height: 50rpx;
  width: 150rpx;
  line-height: 50rpx;
  text-align: center;
  color: white;
  border-radius: 20rpx;
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
  box-shadow: 0 10rpx 30rpx 6rpx #666;
  background: #6a2c70;
  display: flex;
  align-items: center;
  justify-content: center;
}
.team {
  padding: 30rpx 30rpx 10rpx;
  background: white;
}
.team-title {
  font-size: 24rpx;
  color: #666;
}
.team-operation {
  color: #6a2c70;
  position: absolute;
  font-size: 24rpx;
  right: 50rpx;
}
.team-members {
  display: flex;
  margin: 40rpx 0 0;
}
.team-members > li {
  width: 70rpx;
  height: 70rpx;
  margin-right: 20rpx;
}
.team-members > li img {
  width: 100%;
  height: 100%;
}
.team-members > li.team-invite {
  border: 4rpx solid #999;
  text-align: center;
  box-sizing: border-box;
}
.page-btn {
  text-align: center;
  margin: 45rpx auto;
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #6a2c70;
  color: white;
  font-size: 28rpx;
  border-radius: 10rpx;
}
.btn-red {
  background: #b83b5e;
}
.travel-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 24rpx;
  background: white;
  padding: 0 50rpx 20rpx 40rpx;
}
.info-item {
  height: 60rpx;
  width: 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-value {
  color: #666;
}
.travel-list {
  padding: 0 20rpx;
}
.list-item {
  border-radius: 20rpx;
  background: white;
  display: flex;
  padding: 35rpx;
}
.item-left {
  width: 40rpx;
  margin-right: 30rpx;
}
.item-select {
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid #999;
  box-sizing: border-box;
}
.right-title {
  color: #6a2c70;
  font-size: 40rpx;
  line-height: 1;
}
.right-detail {
  color: #666;
  font-size: 24rpx;
  margin-top: 30rpx;
}
</style>

<template>
  <div class="page">
    <div class="team">
      <div v-if="added" class="team-operation">管理</div>
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
          <i-icon v-if="added" class="icon-enter" type="enter" size="24" color="#999"/>
        </li>
        <li class="info-item">
          <span class="info-label">出游时间</span>
          <span class="info-value">{{data.date}}</span>
          <i-icon v-if="added" class="icon-enter" type="enter" size="24" color="#999"/>
        </li>
        <li class="info-item">
          <span class="info-label">集结地</span>
          <span class="info-value">{{data.aggregate}}</span>
          <i-icon v-if="added" class="icon-enter" type="enter" size="24" color="#999"/>
        </li>
        <li class="info-item">
          <span class="info-label">目的地</span>
          <span class="info-value">{{data.destination}}</span>
          <i-icon v-if="added" class="icon-enter" type="enter" size="24" color="#999"/>
        </li>
    </ul>
    <div class="travel-dsc">
      <ul>
        <li class="info-item">
          <span class="info-label">出游计划描述</span>
        </li>
        <li class="info-dsc">
          <p>{{data.dsc}}</p>
        </li>
      </ul>
    </div>
    <div v-if="added" class="page-btns">
      <div class="page-btn" @click="submit1">编辑完成</div>
      <div class="page-btn btn-red" @click="submit1">集结完成</div>
    </div>
    <div v-else class="page-btn" @click="addTravel">加入出游</div>
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
      added: true,
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
        dsc: "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        date: dealDate(new Date()),
        num: 5,
        aggregate: '费楼',
        destination: 'xxx0',
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
    goPreparation() {
      wx.navigateTo({
        url: "/pages/preparation/main?tid=" + this.tid
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
  background: #6a2c70;
  display: flex;
  align-items: center;
  justify-content: center;
}
.team {
  padding: 30rpx;
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
  margin: 40rpx 0;
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
.page-btns {
  display: flex;
  justify-content: center;
}
.btn-red {
  background: #b83b5e;
}
.travel-info {
  font-size: 24rpx;
  background: white;
  margin: 20rpx 0;
  padding: 0 50rpx 40rpx 40rpx;
}
.info-item {
  position: relative;
  height: 100rpx;
  padding: 0 20rpx 0 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #999;
  overflow: visible;
}
.travel-dsc {
  font-size: 24rpx;
  background: white;
  padding: 0 20rpx 0 10rpx;
  padding: 0 50rpx 40rpx 40rpx;
}
.info-value {
  color: #666;
}
.info-dsc {
  padding: 30rpx 20rpx 0 10rpx;
  color: #666;
  line-height: 40rpx;
}
.icon-enter {
  position: absolute;
  right: -20rpx;
  top: 50%;
  transform: translate(0,-50%);
}
</style>

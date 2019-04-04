<template>
  <div class="page">
    <div class="banner">
      <img src="/static/imgs/1.png">
    </div>
    <div v-if="step == 1">
      <div>
        <p class="page-title">为出游计划起个响亮的名字</p>
        <input class="page-input" @change="titleChange">
        <div class="page-btn" @click="next">下一步</div>
      </div>
    </div>
    <div v-if="step == 2">
      <div>
        <p class="page-title">定一个想要的出游时间</p>
        <input placeholder="格式为某年某月某日" class="page-input" @change="timeChange">
        <div class="page-btn" @click="submit">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      step: 1,
      title: 0,
      time: ""
    };
  },
  methods: {
    nameChange(e) {
      this.qname = e.target.detail.value;
    },
    titleChange(e) {
      this.title = e.target.value;
    },
    timeChange(e) {
      this.time = e.target.value;
    },
    submit() {
      // wx.getUserInfo({
      //   success: res => {
      //     const travels = wx.getStorageSync("travels") || [];
      //     if (this.type) {
      //       travels[this.tid].qname = this.qname;
      //       travels[this.tid].qnamedsc = this.qnamedsc;
      //     } else {
      //       travels.push({
      //         qname: this.qname,
      //         qnamedsc: this.qnamedsc,
      //         uname: res.userInfo.nickName,
      //         avatar: res.userInfo.avatarUrl,
      //         id: travels.length
      //       });
      //     }
      //     // 假数据存本地
      //     wx.setStorage({
      //       key: "travels",
      //       data: travels
      //     });
      //     wx.navigateBack({
      //       delta: 1
      //     });
      //   },
      //   fail: () => {
      //     wx.navigateTo({
      //       url: "/pages/mine/main"
      //     });
      //   }
      // });
      wx.switchTab({
        url: "/pages/index/main"
      });

      // if(this.qname.trim()==""||this.qnamedsc.trim()==""||this.qnamedsc.replace(/^\n*/g,'').replace(/\n*$/g,'')=="") {
      //   wx.showToast({
      //     title: '内容不能为空',
      //     icon: 'none',
      //     duration: 500
      //   })
      // }
      // let info = wx.getStorageSync('info')
      // this.$callApi("POST",'question/' + info.uid +'/addQuestion',
      //   {
      //     title:this.qname,
      //     content: this.qnamedsc
      //   }
      // ).then(res=>{
      //   wx.navigateTo({
      //     url: '/pages/que/main?qid=' + res.qid
      //   })
      // })
    },
    next() {
      this.step = 2;
    }
  },
  onLoad(options) {
    // if (options.tid) {
    //   this.tid = options.tid;
    //   this.type = true;
    //   const travel = wx.getStorageSync("travels")[options.tid];
    //   this.qname = travel.qname;
    //   this.qnamedsc = travel.qnamedsc;
    // }
  },
  onShow() {
    this.step = 1;
    this.title = "";
    this.time = "";
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
  overflow: hidden;
  text-align: center;
}
.banner {
  margin-top: 100rpx;
}
.banner img {
  width: 640rpx;
  height: 368.4rpx;
}
.page-input {
  display: block;
  margin: 0 20rpx;
  background: white;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
}
.page-title {
  font-size: 26rpx;
  color: #666;
  margin: 40rpx 0 20rpx 0;
}
.page-btn {
  margin: 45rpx auto;
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #6a2c70;
  color: white;
  font-size: 28rpx;
  border-radius: 10rpx;
}
</style>

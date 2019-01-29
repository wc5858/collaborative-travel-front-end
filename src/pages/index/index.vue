<template>
  <div class="page">
    <i-tabs v-bind:current="current" color="#73116f" @change="handleChange">
      <i-tab key="tab1" title="关注"></i-tab>
      <i-tab key="tab2" title="新回答"></i-tab>
      <i-tab key="tab3" title="新问题"></i-tab>
    </i-tabs>
    <ul v-if="current=='tab1'">
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex" @click="goAnswer(item.aid)">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{'回答了：' +item.question.title}}</view>
          <view slot="footer">{{item.content}}</view>
        </i-card>
      </li>
    </ul>
    <ul v-if="current=='tab2'">
      <li class="list" v-for="(item, itemIndex) in cards2" v-bind:key="itemIndex" @click="goAnswer(item.aid)">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{'回答了：' +item.question.title}}</view>
          <view slot="footer">{{item.content}}</view>
        </i-card>
      </li>
    </ul>
    <ul v-if="current=='tab3'">
      <li class="list" v-for="(item, itemIndex) in cards3" v-bind:key="itemIndex" @click="goQuestion(item.qid)">
        <i-card
          full="true"
          v-bind:title="item.user.name"
          v-bind:thumb="item.user.pictureurl"
        >
          <view slot="content">{{'提问了：' +item.title}}</view>
          <view slot="footer">{{item.content}}</view>
        </i-card>
      </li>
    </ul>
    <div class="add" @click="newQuestion">
      <i-icon type="add" size="45" color="#fff" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      cards2: [],
      cards3: [],
      current: 'tab1'
    };
  },

  methods: {
    handleChange(e) {
      this.current = e.target.key
    },
    load(uid) {
      this.$callApi("GET",'answer/' + uid +'/getFollowUserAnswer').then(res=>{
        this.cards=res
      })
      this.$callApi("GET",'/answer/0/getRecentAnswer').then(res=>{
        this.cards2=res
      })
      this.$callApi("GET",'/question/0/getRecentQuestion').then(res=>{
        this.cards3=res
      })
    },
    goAnswer(i){
      wx.navigateTo({
        url: '/pages/ans/main?aid=' + i
      })
    },
    goQuestion(i){
      wx.navigateTo({
        url: '/pages/que/main?qid=' + i
      })
    },
    newQuestion() {
      wx.navigateTo({
        url: '/pages/newq/main'
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
      this.load(uid)
    }
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

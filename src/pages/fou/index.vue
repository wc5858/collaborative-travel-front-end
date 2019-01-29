<template>
  <div class="page">
    <ul>
      <li class="list" v-for="(item, itemIndex) in cards" v-bind:key="itemIndex">
        {{item.value}}
        <i-card
          full="true"
          v-bind:title="item.name"
          v-bind:thumb="item.pictureurl"
        >
          <i-switch  v-bind:value="item.on" size="large" @change="onChange(itemIndex)" slot="content">
              <view slot="open">关注</view>
              <view slot="close">已取消</view>
          </i-switch>
          <!-- <view slot="content">{{item.ups + '赞回答：' +item.question}}</view>
          <view slot="footer">{{item.answer}}</view> -->
        </i-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: []
    };
  },
  onShow() {
    let info = wx.getStorageSync('info')
      this.$callApi("GET",'user/' + info.uid +'/getFollowUserList').then(res=>{
        res.forEach(element => {
          element.on = true;
        });
        this.cards = res;
      }).catch(e=>{
        console.log(e)
      })
  },
  methods: {
    onChange(i) {
      let target = this.cards[i]
      target.on = !target.on
      this.$callApi("GET",'user/' + wx.getStorageSync('info').uid + '/' + target.uid +(target.on ? '/addFollowUser' : '/removeFollowUser')).then(res=>{
        console.log('操作成功')
      }).catch(e=>{
        console.log(e)  
      })
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
  margin: 20rpx 0;
}
</style>

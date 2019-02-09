<template>
  <div class="page">
    <i-panel title="填写心情">
      <i-input v-for="(item,index) in items" v-bind:key="index" v-bind:value="item.dsc" 
      placeholder="请输入心情" type="textarea" @change="dscChange(index,$event)"/>
    </i-panel>
    <i-button type="info" @click="add">添加心情</i-button>
    <i-button type="info" @click="submit">保存</i-button>
    <button class="share" open-type="share" id="share">
      <i-icon type="share" size="45" color="#fff"/>
    </button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      items: [{
        dsc: ""
      }]
    };
  },
  onShareAppMessage(res) {
    return {
      title: "快来看看我分享的心情吧",
      path: "/pages/mood/main?tid=" + this.tid
    }
  },
  methods: {
    dscChange(i,e){
      this.items[i].dsc = e.target.detail.value
    },
    add() {
      this.items.push({
        dsc: ''
      })
    },
    submit(cal) {
      this.cal = cal
      const travels = wx.getStorageSync('travels')
      travels[this.tid].mood = {
        items: this.items
      }
      wx.setStorage({
        key: 'travels',
        data: travels
      })
      wx.navigateBack({
        delta: 1
      })
    },
  },
  onLoad(options) {
    this.tid = options.tid
  }
  ,
  onShow() {
    const travels = wx.getStorageSync('travels')
    if(travels[this.tid].mood) {
      this.items = travels[this.tid].mood.items
    }
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
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
</style>

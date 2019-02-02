<template>
  <div class="page">
    <div>当前位置</div>
    <div>经度：{{latitude}}</div>
    <div>纬度：{{longitude}}</div>
    <i-button type="info" open-type="share">分享位置</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid:0,
      latitude: "",
      longitude: "",
    };
  },
  methods: {
  },
  onShareAppMessage(res) {
    return {
        title: "我在经度" + this.latitude + "纬度" +this.longitude +"快乐,快来加入吧",
        path: "/page/travel?tid=" + this.tid
      }
  },
  onLoad(options) {
    this.tid = options.tid;
    
  },
  onShow(){
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  console.log(res)
                  that.latitude = res.latitude
                  that.longitude = res.longitude
                },
                fail(e) {
                  console.log(e)
                }
              })
            }
          })
        } else {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log(res)
              that.latitude = res.latitude
              that.longitude = res.longitude
            },
            fail(e) {
              console.log(e)
            }
          })
        }
      } 
    })
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

<template>
  <div class="page">
    <div>{{data}}</div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      travel: {},
      data:""
    };
  },
  methods: {
  },
  onLoad(options) {
    this.tid = options.tid
  }
  ,
  onShow() {
    this.travel = wx.getStorageSync('travels')[this.tid]
    console.log(this.travel)
    this.data = JSON.stringify(this.travel, null, 4)
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

<template>
  <div class="page">
    <i-panel v-bind:title="title">
        <i-checkbox-group v-bind:current="current" @change="handleFruitChange">
            <i-checkbox v-for="(item,idx) in items" v-bind:position="position" v-bind:key="idx" v-bind:value="item.dsc" v-bind:disabled="voted">
            </i-checkbox>
        </i-checkbox-group>
    </i-panel>
    <i-button type="info" @click="submit" v-if="!voted">发布投票</i-button>
    <div v-else style="text-align:center">已投票</div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      title: "", 
      current: [],
      items: [],
      position: 'left',
      voted: false
    };
  },
  methods: {
    handleFruitChange(e) {
      const value = e.target.value
        const index = this.current.indexOf(value)
        index === -1 ? this.current.push(value) : this.current.splice(index, 1)
        console.log(this.current)
    },
    submit() {
      const travels = wx.getStorageSync('travels')
      travels[this.tid].voted = true
      travels[this.tid].myvote = this.current
      wx.setStorage({
        key: 'travels',
        data: travels
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad(options) {
    this.tid = options.tid
  },
  onShow() {
    const travel = wx.getStorageSync('travels')[this.tid]
    if(travel.voted) {
      this.voted = true
      this.current = travel.myvote 
    }
    this.title = travel.vote.title
    this.items = travel.vote.options
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

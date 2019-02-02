<template>
  <div class="page">
    <i-panel title="标题">
      <i-input placeholder="请输入标题" @change="nameChange"  type="textarea" v-bind:value="qname"/>
    </i-panel>
    <i-panel title="准备描述">
      <i-input v-bind:value="qnamedsc" placeholder="请输入准备描述" type="textarea" @change="dscChange"/>
    </i-panel>
    <i-button type="info" @click="submit">发布准备</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      title: "",
      dsc: "\n\n\n",
    };
  },
  methods: {
    nameChange(e){
      this.title = e.target.detail.value
    },
    dscChange(e){
      this.dsc = e.target.detail.value
    },
    submit() {
      const travels = wx.getStorageSync('travels')
      travels[this.tid].hasPreparation = true
      travels[this.tid].preparation = {
        title: this.title,
        dsc: this.dsc
      }
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
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

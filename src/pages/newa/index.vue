<template>
  <div class="page">
    <i-panel title="匿名设置">
        <i-checkbox value="匿名回答" v-bind:checked="checked" @change="handleAnimalChange">
        </i-checkbox>
    </i-panel>
    <i-panel title="回答内容">
      <i-input value="\n\n\n" type="textarea" @change="dscChange"/>
    </i-panel>
    <i-button type="info" @click="submit">发布回答</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      qid: 0,
      dsc: "\n\n\n",
      checked: false
    };
  },
  methods: {
    handleAnimalChange() {
      this.checked = !this.checked
    },
    dscChange(e) {
      this.dsc = e.target.detail.value
    },
    submit() {
      if (this.dsc.trim() == "" || this.dsc.replace(/^\n*/g, '').replace(/\n*$/g, '') == "") {
        wx.showToast({
          title: '请输入回答内容',
          icon: 'none',
          duration: 500
        })
      }
      let info = wx.getStorageSync('info')
      this.$callApi("POST", 'answer/' + info.uid + '/' + this.qid + '/addAnswer',
        {
          content: this.dsc
        }
      ).then(res => {
        wx.navigateTo({
          url: '/pages/que/main?qid=' + this.qid
        })
      })
    }
  },
  onLoad(options) {
    this.qid = options.qid;
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}
</style>

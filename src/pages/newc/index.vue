<template>
  <div class="page">
    <i-panel title="评论内容">
      <i-input value="\n\n\n" type="textarea" @change="dscChange"/>
    </i-panel>
    <i-button type="info" @click="submit">提交评论</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      aid:0,
      dsc: "\n\n\n",
    };
  },
  methods: {
    dscChange(e){
      this.dsc = e.target.detail.value
    },
    submit() {
      if(this.dsc.trim()==""||this.dsc.replace(/^\n*/g,'').replace(/\n*$/g,'')=="") {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 500
        })
      }
      let info = wx.getStorageSync('info')
      this.$callApi("POST",'comment/' + info.uid +'/' + this.aid +'/addComment',
        {
          content: this.dsc
        }
      ).then(res=>{
        wx.navigateTo({
          url: '/pages/ans/main?aid=' + this.aid
        })
      })
    }
  },
  onLoad(options) {
    console.log(options)
    this.aid = options.aid;
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

<template>
  <div class="page">
    <i-panel title="问题">
      <i-input placeholder="请输入问题" @change="nameChange"/>
    </i-panel>
    <i-panel title="问题描述">
      <i-input value="\n\n\n" placeholder="请输入问题" type="textarea" @change="dscChange"/>
    </i-panel>
    <i-button type="info" @click="submit">发布问题</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      qname: "",
      qnamedsc: "\n\n\n",
    };
  },
  methods: {
    nameChange(e){
      this.qname = e.target.detail.value
    },
    dscChange(e){
      this.qnamedsc = e.target.detail.value
    },
    submit() {
      if(this.qname.trim()==""||this.qnamedsc.trim()==""||this.qnamedsc.replace(/^\n*/g,'').replace(/\n*$/g,'')=="") {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 500
        })
      }
      let info = wx.getStorageSync('info')
      this.$callApi("POST",'question/' + info.uid +'/addQuestion',
        {
          title:this.qname,
          content: this.qnamedsc
        }
      ).then(res=>{
        wx.navigateTo({
          url: '/pages/que/main?qid=' + res.qid
        })
      })
    }
  },
  onLoad() {
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

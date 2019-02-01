<template>
  <div class="page">
    <i-panel title="标题">
      <i-input placeholder="请输入标题" @change="nameChange"/>
    </i-panel>
    <i-panel title="出游描述">
      <i-input value="\n\n\n" placeholder="请输入出游描述" type="textarea" @change="dscChange"/>
    </i-panel>
    <i-button type="info" @click="submit">{{type?'修改出游':'发布出游'}}</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      type: false, //true代表修改
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
      wx.getUserInfo({
        success: res => {
          const travels = wx.getStorageSync('travels') || []
          if(this.type) {
            travels[this.tid].qname = this.qname
            travels[this.tid].qnamedsc = this.qnamedsc
          } else {
            travels.push({
              qname:this.qname,
              qnamedsc:this.qnamedsc,
              uname: res.userInfo.nickName,
              avatar: res.userInfo.avatarUrl,
              id: travels.length
            })
          }
          // 假数据存本地
          wx.setStorage({
            key: 'travels',
            data: travels
          })
          wx.navigateBack({
            delta: 1
          })
        },
        fail: () => {
          wx.navigateTo({
            url: '/pages/mine/main'
          })
        }
      });
      
      
      // if(this.qname.trim()==""||this.qnamedsc.trim()==""||this.qnamedsc.replace(/^\n*/g,'').replace(/\n*$/g,'')=="") {
      //   wx.showToast({
      //     title: '内容不能为空',
      //     icon: 'none',
      //     duration: 500
      //   })
      // }
      // let info = wx.getStorageSync('info')
      // this.$callApi("POST",'question/' + info.uid +'/addQuestion',
      //   {
      //     title:this.qname,
      //     content: this.qnamedsc
      //   }
      // ).then(res=>{
      //   wx.navigateTo({
      //     url: '/pages/que/main?qid=' + res.qid
      //   })
      // })
    }
  },
  onLoad(options) {
    if(options.tid) {
      this.tid = options.tid
      this.type = true
    }
  }
};
</script>

<style>
.page {
  background: #f3f3f3;
  min-height: 100vh;
}

</style>

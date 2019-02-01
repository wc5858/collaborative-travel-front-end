<template>
  <div class="page">
    <i-panel title="标题">
      <i-input placeholder="请输入标题" type="textarea" @change="titleChange" v-bind:value="title" />
    </i-panel>
    <i-panel title="添加选项">
      <i-input v-for="(item,index) in items" v-bind:key="index" v-bind:value="item.dsc" 
      placeholder="请输入选项" type="textarea" @change="dscChange(index,$event)"/>
    </i-panel>
    <i-button type="info" @click="add">添加选项</i-button>
    <i-button type="info" @click="submit">发布投票</i-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tid: 0,
      type: false, //true代表修改
      title: "",
      items: [{
        dsc: ""
      },{
        dsc: ""
      }]
    };
  },
  methods: {
    titleChange(e){
      this.title = e.target.detail.value
    },
    dscChange(i,e){
      this.items[i].dsc = e.target.detail.value
    },
    add() {
      this.items.push({
        dsc: ''
      })
    },
    submit() {
      const travels = wx.getStorageSync('travels')
      travels[this.tid].hasVote = true
      let set = new Set(this.items)
      travels[this.tid].vote = {
        title: this.title,
        options: [...set]
      }
      wx.setStorage({
        key: 'travels',
        data: travels
      })
      wx.navigateBack({
        delta: 1
      })
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

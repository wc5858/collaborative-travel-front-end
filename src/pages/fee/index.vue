<template>
  <div class="page">
    <i-panel title="填写费用">
      <i-input v-for="(item,index) in items" v-bind:key="index" v-bind:value="item.dsc" 
      placeholder="请输入费用" type="textarea" @change="dscChange(index,$event)" v-bind:disabled="cal"/>
    </i-panel>
    <i-button type="info" @click="add" v-if="!cal">添加项目</i-button>
    <i-button type="info" @click="submit(false)" v-if="!cal">保存</i-button>
    <i-button type="info" @click="submit(true)" v-if="!cal">计算花费</i-button>
    <div style="text-align:center" v-if="!cal">计算花费后不能更改花费，请谨慎操作</div>
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
      }],
      cal:false
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
    submit(cal) {
      this.cal = cal
      const travels = wx.getStorageSync('travels')
      travels[this.tid].fee = {
        items: this.items,
        cal: cal
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
    if(travels[this.tid].fee) {
      this.items = travels[this.tid].fee.items
      this.cal = travels[this.tid].fee.cal
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

<template>
  <div class="my-menu-box" ref="test">
    <el-scrollbar style="height: 100%">
      <div class="my-menu my-menu-hover" @click="animationSpan($event,index)"
           v-for="(item,index) in menuData" :key="index">
        <span class="menu-title">{{item.name}}</span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "myMenu",
  computed: {
    menuData:{
      get(){
        return this.$store.state.appData
      }
    }
  },
  data() {
    return {
      spanIndex: -1
    }
  },
  methods: {
    animationSpan(event,index) { // 点击切换class
      //点击元素 切换样式
      event.target.style.cssText += "background-color: rgba(194, 185, 185, 0.3);"
      if(this.spanIndex !== -1){ // 第一次不进入 复位上次的菜单样式
        const dom2 = this.$refs.test.getElementsByClassName('my-menu')[this.spanIndex]
        // console.log(dom2.)
        dom2.style.cssText = "background-color: rgba(51, 51, 51);"
      }
      this.spanIndex = index
      this.$emit('menuSwitch',this.spanIndex)
    }
  }
}
</script>

<style scoped>
.my-menu-box {
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51);
  box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
}
.my-menu-box:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0 10px 20px, rgba(0, 0, 0, 0.30) 0 6px 6px, rgba(32, 44, 73, 0.23) 0 6px 6px;
}
.my-menu{
  width: 100%;
  /*height: 50px;*/
  background-color: rgba(51, 51, 51);
  cursor: pointer;
  /*border-bottom: 1px #222f3d solid;*/
}

.menu-title {
  /*position: relative;*/
  color: aliceblue;
  line-height: 50px;
  margin: 0 0 0 15px;
  font-family: SFMono-Regular,
  Menlo, Monaco, Consolas,
  "Liberation Mono", "Courier New", monospace;
}

.my-menu-hover:hover {
  background-color: rgba(194, 185, 185, 0.2) !important;
}

</style>
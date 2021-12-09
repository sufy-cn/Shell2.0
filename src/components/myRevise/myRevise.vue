<template>
  <el-dialog title="修改shell指令"
             :visible.sync="reviseShow"
              v-if="data"
  >
    <el-input
        type="textarea"
        autosize
        placeholder="name"
        v-model="data.name">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
        type="textarea"
        autosize
        placeholder="shell"
        v-model="data.shell">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reviseShow = false">取 消</el-button>
      <el-button type="primary" @click="reviseDataRun()">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import char from "@/components/myDialog/index";

export default {
  name: "myDialog",
  props: {
    data: {}
  },
  data() {
    return {
      inputName: '',
      inputShell: ''
    }
  },
  computed: {
    reviseShow: { // 弹出框开关
      get() {
        return this.$store.state.reviseShow
      },
      set(value) {
        this.$store.commit('reviseShow', value)
      }
    }
  },
  beforeUpdate() {
    // if(this.data){
    //   this.inputName = this.data.name
    //   this.inputShell = this.data.shell
    // }
  },
  methods: {
    openFullScreen() { // 全局加载1
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      }, 800);

    },
    reviseDataRun() {
      const data = {
        name: this.data.name,
        shell: this.data.shell
      }
      if (char.testing(data) !== '不符合规范') {
        this.reviseShow = false
        return this.$emit('reviseShell', data)
      }
      this.$message({
        message: 'shell不符合规范请重新输入',
        type: "error"
      })
    }

  }
}
</script>

<style scoped>

</style>
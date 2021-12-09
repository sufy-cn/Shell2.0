<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogShow">
    <el-input
        type="textarea"
        autosize
        placeholder="name"
        v-model="inputName">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
        type="textarea"
        autosize
        placeholder="shell"
        v-model="inputShell">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="addDataRun()">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import char from "@/components/myDialog/index";

export default {
  name: "myDialog",
  props: {
    // dialogTitle: {
    //   type: String,
    //   default: '添加shell'
    // }
  },
  data() {
    return {
      inputName: '',
      inputShell: ''
    }
  },
  computed: {
    dialogTitle: {
      get() {
        return this.$store.state.dialogTit
      }
    },
    dialogShow: { // 弹出框开关
      get() {
        return this.$store.state.dialogShow
      },
      set(value) {
        this.$store.commit('dialogShow', value)
      }
    }
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
    addDataRun() {
      const data = {
        name: this.inputName,
        shell: this.inputShell
      }
      if (char.testing(data) !== '不符合规范') {
        this.dialogShow = false
        return this.$emit('addShell', data)
      }
      this.$message({
        message : 'shell不符合规范请重新输入',
        type : "error"
      })
    }

  }
}
</script>

<style scoped>

</style>
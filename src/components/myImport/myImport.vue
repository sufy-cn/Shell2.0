<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="importShow">
    <el-input
        type="textarea"
        autosize
        :placeholder="placeholder"
        v-model="inputTemp">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="importShow = false">取 消</el-button>
      <el-button type="primary" @click="addDataRun()">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: "myImport",
  props: {
    // dialogShow:{
    //   type : Boolean,
    //   default : true
    // }
  },
  computed: {
    importShow: { // 弹出框开关
      get() {
        return this.$store.state.importShow
      },
      set(value) {
        this.$store.commit('importShow', value)
      }
    }
  },
  data() {
    return {
      dialogTitle: '导入shell指令的Json数据',
      inputTemp: null,
      placeholder: '请按照[{"name":"***","shell":"**#ip**#port**"}]标准json格式进行导入'
    }
  },
  methods: {
    openFullScreen() { // 全局加载1

      // setTimeout(() => {
      //   loading.close();
      //   this.$message({
      //     message: '恭喜你，这是一条成功消息',
      //     type: 'success'
      //   });
      // }, 800);

    },
    addDataRun() {
      // this.openFullScreen()
      let temp = JSON.parse(this.inputTemp)
      if (temp !== null) { // 如果不是空
        if (typeof temp === 'object') {
          let loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          temp.some((res, index) => {
            if (!(res.name && res.shell && res.name !== "" && res.shell !== "")) {
              loading.close();
              this.$message({
                message: '数据格式不对请修改',
                type: 'error'
              });
              this.$store.commit('importShow', false)
              return true
            } else {
              if (index + 1 === temp.length) { // 如果成功运行的最后才会执行
                let tempImportData = []
                temp.map(res => {
                  const tempData = {
                    "name": res.name,
                    "shell": res.shell
                  }
                  tempImportData.push(tempData)
                })
                temp = this.$store.state.appData.concat(tempImportData)
                //add shell Data
                this.$store.commit('appData', temp)
                this.$storage.set('appData', temp)

                this.$store.commit('importShow', false)
                // 滞空
                this.inputTemp = null
                // 打开显示面板
                this.$emit('fshow')

                setTimeout(() => {
                  loading.close();
                  this.$notify({
                    title: '成功',
                    message: '导入成功！',
                    type: 'success'
                  });
                }, 800);
              }
            }
          })
        } else {
          this.$message({
            message: '请严格按照提示的格式输入',
            type: 'error'
          });
        }
      } else {
        this.$message({
          message: '您没有任何输入',
          type: 'error'
        });
      }


    }

  }
}
</script>

<style scoped>

</style>
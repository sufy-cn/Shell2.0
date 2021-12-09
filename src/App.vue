<template>
  <div id="app">
    <el-container>
      <!--   头部     -->
      <el-header>
        <my-header></my-header>
      </el-header>
      <!--   主函数    -->
      <el-main>
        <!--        -->
        <div class="ip-port">
          <div class="el-inp-box">
            <el-input style="width: 100%" placeholder="请输入内容" v-model="ip">
              <template slot="prepend">Ip</template>
            </el-input>
          </div>
          <!--          -->
          <div class="el-inp-box">
            <el-input style="width: 100%" placeholder="请输入内容" v-model="port">
              <template slot="append">Port</template>
            </el-input>
          </div>
          <!--          -->
          <div class="add">
            <el-button type="primary" @click="addDialog()">添加shell</el-button>
            <el-button type="primary" @click="import_file()">导入</el-button>
            <el-button type="primary" @click="export_file()">导出</el-button>
          </div>
          <!--          -->
        </div>
        <!--        -->
        <div class="main-box">
          <div class="myMenu-box">
            <myMenu v-if="fshow" @menuSwitch="menuSwitch"></myMenu>
          </div>


          <div class="myShell-box">
            <myShell v-if="fshow" @domRevise="domRevise" @deleShell="deleShell" @again="menuSwitch" :index="menuIndex"
                     :data="menuIndexData.shell"></myShell>
          </div>

        </div>
      </el-main>
      <my-dialog @addShell="addShell" :dialogTitle="dialogTitle"></my-dialog>
      <my-import @fshow="fshow = true"></my-import>
      <myRevise @reviseShell="reviseShell" :data="reviseTempInput"></myRevise>
    </el-container>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import myMenu from "@/components/myMenu/myMenu";
import myShell from "@/components/myShell/myShell";
import myHeader from "@/components/myHeader/myHeader";
import myDialog from "@/components/myDialog/myDialog";
import myImport from "@/components/myImport/myImport";
import myRevise from "@/components/myRevise/myRevise";

import app from "@/method/app";
// import char from "@/components/myDialog";

export default {
  name: 'App',
  components: {
    myMenu,
    myShell,
    myHeader,
    myDialog,
    myImport,
    myRevise
  },
  data() {
    return {
      appData: [],
      menuIndex: -1,
      menuIndexData: [],
      importShow: false,
      fshow: false,  // data里是否有数据
      reviseTempInput: null // 要被重置的临时数据
    }
  },
  watch: {
    "$store.state.ip"() {
      this.$storage.get('appData', res => {
        if (res !== null && res.length !== 0) {
          app.Handle(res[this.menuIndex], res => {
            this.menuIndexData = res
          })
        }

      })
    },
    "$store.state.port"() {
      this.$storage.get('appData', res => {
        if (res !== null && res.length !== 0) {
          app.Handle(res[this.menuIndex], res => {
            this.menuIndexData = res
          })
        }
      })
    }
  },
  computed: {
    ip: {
      get() {
        return this.$store.state.ip
      },
      set(value) {
        this.$storage.set('ip', value)
        this.$store.commit('ip', value)
      }
    },
    port: {
      get() {
        return this.$store.state.port
      },
      set(value) {
        if (value < 65535) {
          this.$storage.set('port', value)
          this.$store.commit('port', value)
        } else {
          this.$message({
            message: '没有这种端口',
            type: 'error'
          });
        }
      }
    },
    dialogTitle: {
      get() {
        return this.$store.state.dialogTit
      }
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    run() { // 初始化
      let loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      app.init_ip(res => { // 初始化ip和port
        if (res === 'ip' || res === 'port') {
          this.info('未配置' + res, 'warning')
        } else {
          this.$store.commit('ip', res.ip)
          this.$store.commit('port', res.port)
        }
      })
      app.init_data(res => { // 初始化 shell data
        res !== 'null' && res.length !== 0 ? this.init() : this.first_time()
        setTimeout(() => {
          loading.close()
        }, 1000)
      })
    },
    first_time() { // 第一次进入
      setTimeout(() => {
        this.info('请添加shell指令', 'warning')
      }, 1000)
      this.$storage.set('Encoding_select', 'None')
      this.$storage.set('Shell_select', 'sh')
    },
    init() { // 非第一次的进入初始化
      this.fshow = true
      app.init_select(res => {
        this.$store.commit('Encoding_select', res.Encoding)
        this.$store.commit('Shell_select', res.Shell)
      })
      this.$storage.get('appData', res => {
        this.menuIndex = 0
        this.$store.state.appData = res
        app.Handle(res[this.menuIndex], res => {
          this.menuIndexData = res
        })
        // this.menuIndexData = this.$store.state.appData[0]
      })
    },
    menuSwitch(index) { // 菜单切换
      this.$storage.get('appData', res => {
        app.Handle(res[index], res => {
          this.menuIndexData = res
        })
      })
      this.menuIndex = index
    },
    addShell(e) { // 添加shell
      app.add(e)
      this.fshow = true
      this.$notify({
        title: '成功',
        message: '添加成功！',
        type: 'success'
      });
      if (this.menuIndex === -1) { // 如果是第一次添加数据
        this.init()
      }
    },
    deleShell(index) { // 删除shell
      app.dele(index, res => {
        if (res.length === 0) {
          this.first_time()
          this.fshow = false
        } else {
          this.init()
        }
        this.$notify({
          title: '成功',
          message: '删除成功！',
          type: 'warning'
        });
      })
    },
    domRevise(index) { // 修改 shell
      this.$storage.get('appData', res => {
        this.reviseTempInput = res[index]
        this.$store.commit('reviseShow', true)
      })
      // app.revise()
      // console.log(index)
    },
    reviseShell(e) {
      app.revise(e, this.menuIndex, () => {
        console.log('ok')
      })
    },
    addDialog() { // 添加shell 开关
      this.$store.commit('dialogShow', true)
    },
    import_file() { // 导入
      this.$store.commit('importShow', true)
    },
    export_file() { // 导出文件
      this.$storage.get('appData', res => {
        if(res.length !== 0){
          let data = JSON.stringify(res)
          //encodeURIComponent解决中文乱码
          let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
          //通过创建a标签实现
          let link = document.createElement("a");
          link.href = uri;
          //对下载的文件命名
          link.download = "shell指令合计.json";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.$notify({
            title: '成功',
            message: '导出成功！',
            type: 'success'
          });
        }else{
          this.info('数据为空请添加后再来吧','error')
        }

      })
    },
    info(message, type) { // 消息提醒
      this.$message({
        message: message,
        type: type
      })
    }
  }


}
</script>

<style>
@import "assets/app.css";
</style>
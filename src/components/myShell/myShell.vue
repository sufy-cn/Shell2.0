<template>
  <div class="box">
    <div class="txt" @mouseover="overRun($event)" @mouseleave="leaveRun($event)">
      <span style="display: none;" class="env-del-btn-span el-icon-delete" @click="domDele(index)"></span>
      <span style="display: none;" class="env-del-btn-span el-icon-edit-outline" @click="domRevise(index)"></span>

      <el-scrollbar style="height: 100%;">
        <el-tooltip class="item" effect="dark"
                    content="双击复制" placement="top-end">
          <!--关闭语法检测-->
          <pre spellcheck="false"
               contenteditable="true"
               @keyup="editnameSet(index,$event)"
               @dblclick="shellCopy(data)"
               class="text-pre">{{ data }}</pre>
          <!--可编辑-->
        </el-tooltip>
      </el-scrollbar>
    </div>
    <div class="select-box">
      <div class="shell-select select-mini">
        <el-select v-model="Shell_select" placeholder="Shell">
          <el-option
              v-for="item in shell_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="Encoding-select select-mini">
        <el-select v-model="Encoding_select" placeholder="Encoding">
          <el-option
              v-for="item in Encoding_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myShell",
  computed: {
    Shell_select: {
      get() {
        return this.$store.state.Shell_select
      },
      set(value) {
        this.$storage.set('Shell_select', value)
        this.$store.commit('Shell_select', value)
      }
    },
    Encoding_select: {
      get() {
        return this.$store.state.Encoding_select
      },
      set(value) {
        this.$storage.set('Encoding_select', value)
        this.$store.commit('Encoding_select', value)
      }
    },
  },
  watch: {
    Encoding_select() {
      this.$emit('again',this.index)
    },
    Shell_select() {
      this.$emit('again',this.index)
    }
  },
  data() {
    return {
      Encoding_options: [{
        value: 'None',
        label: 'None'
      }, {
        value: 'encodeURI',
        label: 'encodeURI'
      }, {
        value: 'encodeURIComponent',
        label: 'encodeURIComponent'
      }, {
        value: 'Base64',
        label: 'Base64'
      }
      ],
      shell_options: [{
        value: '/bin/sh',
        label: '/bin/sh'
      }, {
        value: 'bash',
        label: 'bash'
      }, {
        value: '/bin/bash',
        label: '/bin/bash'
      }, {
        value: 'ash',
        label: 'ash'
      }, {
        value: 'bsh',
        label: 'bsh'
      }, {
        value: 'csh',
        label: 'csh'
      }, {
        value: 'ksh',
        label: 'ksh'
      }, {
        value: 'zsh',
        label: 'zsh'
      }, {
        value: 'pdksh',
        label: 'pdksh'
      }, {
        value: 'tcsh',
        label: 'tcsh'
      }],
    }
  }
  ,
  props: {
    data: {
      type: String,
      default: ''
    }
    ,
    index: {
      type: Number,
      default: 0
    }
  }
  ,
  methods: {
    domDele(index){ // 删除
      this.$emit('deleShell',index)
    },
    domRevise(index){
      this.$emit('domRevise',index)
    },
    overRun(event) { // 鼠标移入
      //获取 删除和修改 元素
      const dom = event.currentTarget.getElementsByClassName('env-del-btn-span')
      dom[0].style.cssText += "display:block"
      dom[1].style.cssText += "display:block"
    },
    // eslint-disable-next-line no-unused-vars
    leaveRun(event) { // 鼠标移出
      const dom = event.currentTarget.getElementsByClassName('env-del-btn-span')
      dom[0].style.cssText += "display:none"
      dom[1].style.cssText += "display:none"
    },
    shellCopy(data) { // 复制
      console.log(data)
      let input = document.createElement('input');
      input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
      input.setAttribute('value', data);
      document.body.appendChild(input);
      // input.setSelectionRange(0, 9999);
      input.select();
      let res = document.execCommand('copy');
      document.body.removeChild(input);
      this.$notify({
        title: '成功',
        message: '复制成功！',
        type: 'success'
      });
      return res;
    },
    editnameSet(index, eve) {
      this.$storage.get('appData', res => {
        res[index].shell = eve.target.outerText
        this.$store.state.appData = res
      })
    }
  }
}

</script>

<style scoped>
.box {

  width: 100%;
  /*height: 100%;*/
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /*align-items: center;*/
  /*border: 1px red solid;*/
}

.select-box {
  display: flex;
  /*justify-content: space-around;*/
  width: 100%;
  /*justify-content: center;*/
}

.select-mini {
  margin: 15px;
}

.txt {
  width: 100%;
  /*height: 80%;*/
  min-height: 100px;
  max-height: 300px;
  /*margin: 2% 0 0 0;*/
  background-color: rgba(51, 51, 51);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.txt:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 10px 20px, rgba(0, 0, 0, 0.30) 0px 6px 6px;
}

.text-pre {
  padding: 10px;
  white-space: pre-wrap;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  color: aliceblue;
  cursor: pointer;
}

.env-del-btn-span{
  float:right;
  margin: 10px 10px 5px 0;
  color: rgba(222,222,222);
  cursor: pointer;
}
</style>
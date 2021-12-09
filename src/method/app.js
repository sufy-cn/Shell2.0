/* App.vue中公用方法 */
import store from "@/Vuex";
// 全局 状态 管理
import storage from "@/method/localStorage";
// 存储 方法

let Base64 = require('js-base64').Base64;

const app = {
    init_ip(callback) { // 初始化 ip和端口
        const dataTemp = {}
        storage.get('ip', res => {
            if (res !== null && res !== "") { // 如果不为空就读取数据 返回值
                dataTemp.ip = res
                storage.get('port', res => {
                    if (res !== null && res !== '') {
                        dataTemp.port = res
                        return callback(dataTemp)
                    } else {
                        return callback('port')
                    }
                })
            } else {
                return callback('ip')
            }
        })
    },
    init_data(callback) {
        storage.get('appData', res => {
            if (res !== null && res !== "") { // 如果不为空就读取数据 返回值
                return callback(res)
            } else {
                return callback('null')
            }
        })
    },
    init_select(callback) { // 初始化 shell和 Encoding 的 select
        const temp = {}
        storage.get('Encoding_select', res => {
            temp.Encoding = res
        })
        storage.get('Shell_select', res => {
            temp.Shell = res
        })
        return callback(temp)
    },
    add(e) { // 添加shell
        let temp = {
            "name": e.name,
            "shell": e.shell
        }
        store.state.appData.push(temp)
        storage.set('appData', store.state.appData)
    },
    dele(e, callback) { // 删除shell
        storage.get('appData', res => {
            res.splice(Number(e), 1)
            storage.set('appData', res)
            store.commit('appData', res)
            return callback(res)
        })
    },
    revise(e, index,callback) {
        storage.get('appData', res => {
            res.splice(index, 1, e)
            storage.set('appData', res)
            store.commit('appData', res)
            return callback(res)
        })
    },
    Handle(data, callback) { // 字符串控制
        let temp = data.shell.replace(/#ip/g, store.state.ip)
        temp = temp.replace(/#port/g, store.state.port)
        temp = temp.replace(/#shell/g, store.state.Shell_select)
        data.shell = temp
        storage.get('Encoding_select', res => {
            if (res === 'encodeURI') {
                data.shell = encodeURI(data.shell)
            } else if (res === 'encodeURIComponent') {
                data.shell = encodeURIComponent(data.shell)
            } else if (res === 'Base64') {
                data.shell = Base64.encode(data.shell)
            }
        })
        return callback(data)
    }
}
export default app;
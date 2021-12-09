import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
    //state
    state: {
        ip: '', // ip
        port: '', // 端口
        appData: [], // 全局数据 shell{name,value} json
        dialogTit: '添加shell', // 弹框文字
        dialogShow: false, // 弹框状态
        importShow: false,
        reviseShow: false,
        Shell_select : 'sh',
        Encoding_select : 'None'
    },
    mutations: {
        ip(state, message) {
            state.ip = message
        },
        port(state, message) {
            state.port = message
        },
        appData(state, message) {
            state.appData = message
        },
        dialogTit(state, message) {
            state.dialogTit = message
        },
        dialogShow(state, message) {
            state.dialogShow = message
        },
        importShow(state, message) {
            state.importShow = message
        },
        reviseShow(state, message) {
            state.reviseShow = message
        },
        Encoding_select(state, message) {
            state.Encoding_select = message
        },
        Shell_select(state, message) {
            state.Shell_select = message
        },

    }
});

export default store;
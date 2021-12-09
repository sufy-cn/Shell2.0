import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

Vue.use(element)

import store from './Vuex/index';

import storage from "@/method/localStorage";
Vue.prototype.$storage = storage;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')

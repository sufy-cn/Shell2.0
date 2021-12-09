import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

Vue.use(element)
// import ElementUI from 'element-ui';

// Vue.use(ElementUI)

import store from './Vuex/index';

// import localStorage from "@/method/localStorage";

import storage from "@/method/localStorage";
Vue.prototype.$storage = storage;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')

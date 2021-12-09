// 导入自己需要的组件
import {
    Container, Main, Header, Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Scrollbar,
    Input,
    Button,
    Dialog,
    Tooltip,
    Select,
    Option,
    Notification,
    Message,
    Loading,

    InfiniteScroll,
} from 'element-ui'

const element = {
    install: function (Vue) {
        Vue.use(Container)
        Vue.use(Main)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(MenuItemGroup)
        Vue.use(MenuItem)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(Scrollbar)
        Vue.use(Input)
        Vue.use(Button)
        Vue.use(Dialog)
        Vue.use(Tooltip)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Loading)
        Vue.prototype.$message = Message
        Vue.prototype.$notify = Notification
        // Vue.prototype.$loading = Loading
        Vue.use(InfiniteScroll)
    }
}
export default element

//@text 封装操作localstorage本地存储的方法
//@coder sufy
//@time 2021/12/06
const storage = {

//存储
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return true
    },
//取出数据
    get(key, callback) {
        return callback(JSON.parse(localStorage.getItem(key)))
    },
// 删除数据
    remove(key) {
        localStorage.removeItem(key);
        return true
    },
// 清除所有localStorage
    deleAll() {
        window.localStorage.clear()
    },
// 监听数据
    monitor() {
        window.addEventListener('storage', e => {
            console.log(e)
        })
    }
}

// 暴露给外部访问
export default storage;
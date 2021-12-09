const char = {
    testing(value) {
        if (value.shell.search("#ip") !== -1
            && value.shell.search("#port") !== -1) {
            return value
        }
        return '不符合规范'
    }
}
export default char

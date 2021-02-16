const changeOldMatchStatisticsClass = (setClass: Function, state: any) => setInterval(() => {
    state? setClass(false) : setClass(true)
}, 4000)

export default changeOldMatchStatisticsClass
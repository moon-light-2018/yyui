import moment from 'moment'
export const weekArr = ['一', '二', '三', '四', '五', '六', '七']
export const getMonth = (year, month) => {
    const date = `${year}-${month}`
    const lastArr = getLastDays(date)
    const nowMonthDays = moment(date).endOf('month').format('YYYY-MM-DD').split('-')[2]
    const size = 42 - nowMonthDays - lastArr.length
    let nextStr = moment(date).add(1, 'month').format('YYYY-MM')
    const nowArr = getDays(nowMonthDays, 'now', date)
    const nextArr = getDays(size, 'next', nextStr)
    return [...lastArr, ...nowArr, ...nextArr]
}
//获取上个月的日期参数
const getLastDays = (date) => {
    const start = moment(date).startOf('week').format('YYYY-MM-DD')
    const end = moment(start).endOf('month').format('YYYY-MM-DD')
    if (start == moment(date).format('YYYY-MM-DD')) {
        return []
    }
    return getDateArr(start, end)
}
//获取size长度的数组
const getDays = (size, type, str) => {
    const data = []
    for (let i = 0; i < size; i++) {
        data.push({ value: i + 1, type: type, date: `${str}-${i + 1}` })
    }
    return data
}
//获取上个月的数组
const getDateArr = (start, end) => {
    const min = start.split('-')
    let str = `${min[0]}-${min[1]}`
    const max = end.split('-')[2]
    let data = []
    for (let i = 0; i < max - min[2]; i++) {
        const value = Number(min[2]) + i + 1
        data.push({ value: value, type: 'last', date: `${str}-${value}` })
    }
    return data
}

// const adasd = {
//     "name": "@param_age",
//     "title": "年龄",
//     "stype": 0,
//     "values": [
//         {
//             "name": "19-24岁",
//             "code": "5"
//         }, {
//             "name": "25-29岁",
//             "code": "1"
//         }
//     ]
// }


// function getAgeValue(data = {}) {
//     let { values = [] } = data
//     console.log("getAgeValue -> values", values)
//     let str = ''
//     if (values.length > 0) {
//         const firstValue = values[0].name.split('-')
//         let start = firstValue[0]
//         let end = firstValue[1].replace('岁', '')
//         if (values.length > 1) {
//             const endValue = values[values.length - 1].name.split('-')
//             end = endValue[1].replace('岁', '')
//         }
//         str = `${start}-${end}`
//     }
//     return str
// }
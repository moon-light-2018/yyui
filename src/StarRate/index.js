import React from 'react'
import './index.less'
/**
 * 评分星星支持小数点的组件
 * @param {*} number 评分值
 *  size星星的个数,默认10个
 *  highColor高亮星星的样式,默认#7300FF
 *  defaultColor灰色星星的样式,默认#B6B6B6
 */
function StarRate({ number = 6.2, size = 10, highColor = '#7300FF', defaultColor = '#B6B6B6' }) {
    const numberTen = number * 10 * size//处理成整数
    const firstNum = Math.floor(numberTen / 10 / size)//获取整数部分
    const lastNum = numberTen % (size * 10)//获取小数部分
    let starList = []//存储满星个数
    for (let i = 0; i < firstNum; i++) {
        starList.push(i)
    }
    let grayList = []//存储无星的个数
    let graySize = lastNum ? size - firstNum - 1 : size - firstNum
    for (let i = 0; i < graySize; i++) {
        grayList.push(i)
    }
    const starColorParams = { highColor, defaultColor }//传给子类的参数
    return (
        <div className='star-rate-box'>
            {starList.map(one => {
                return <CheckedStar number={100} {...starColorParams} />
            })}
            {lastNum ? <CheckedStar number={lastNum}  {...starColorParams} /> : null}
            {grayList.map(one => {
                return <CheckedStar  {...starColorParams} />
            })}
            <span style={{ paddingLeft: 8, color: highColor }}>{number}</span>
        </div>
    )
}
function CheckedStar({ number, highColor, defaultColor }) {
    const backStyle = number ? {
        backgroundColor: highColor,
        backgroundImage: `linear-gradient(90deg, ${highColor} ${number}%, ${defaultColor} 20%)`
    } : { background: defaultColor }
    return (
        <div className='checked-star-box'>
            <img src={require('./fill.png')} />
            <div className='color-star' style={backStyle}></div>
        </div>
    )
}
export default StarRate

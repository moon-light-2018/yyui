import React, { useState } from 'react'
import './MultipleButton.less'
const listInit = [
    { name: '娱乐地域', value: '1' },
    { name: '游戏地域', value: '2' },
    { name: '音乐地域', value: '3' },

]
export default function MultipleButton(props) {
    const { onChange, list = listInit, initValue = ['1'], valueKey } = props
    const [selectedValue, setSelectedValue] = useState(initValue)
    function clickItemFunc(value) {
        let nowValue = selectedValue
        if (getIsSelectedValue(value)) {
            nowValue = selectedValue.filter(one => one !== value)
        } else {
            nowValue = [...selectedValue, value]
        }
        setSelectedValue(nowValue)
        onChange && onChange(nowValue)
    }
    function getIsSelectedValue(value) {
        if (selectedValue.includes(value)) {
            return true
        } else {
            return false
        }
    }
    return (
        <div className='multiple-button'>
            {list.map(one => <div
                className={`button-item${getIsSelectedValue(one[valueKey]) ? ' button-item-active' : ''}`}
                key={one.name}
                onClick={() => clickItemFunc(one[valueKey])}>
                {one.name}
            </div>)}
        </div>
    )
}

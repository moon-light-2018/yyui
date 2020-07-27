import React, { useState } from 'react'
import { DatePicker, Icon } from 'antd'
import './FeatureDayTwo.css'
import moment from 'moment'

function FeatureDayTwo(props) {
    const { value = [], onChange } = props
    const start = moment().add(-3, 'months').startOf("month")
    const defaultSecond = moment(start).add(1, 'day')
    const [firstValue, setFirstValue] = useState(value[1] || start)
    const [secondValue, setSecondValue] = useState(value[2] || defaultSecond)

    function getDisabledDate(value, selectedValue) {
        const end = moment().add(-3, 'months').endOf("month")
        let canMonth = value.valueOf() < start.valueOf() || value.valueOf() > end.valueOf()
        if (selectedValue) {
            canMonth = canMonth || (moment(moment(selectedValue).format('YYYY-MM-DD')).valueOf() == moment(moment(value).format('YYYY-MM-DD')).valueOf())
        }
        return canMonth
    }
    function onChangeDateFirst(date) {
        setFirstValue(date)
        onChange && onChange(getValue())
    }
    function getValue() {
        let arr = []
        if (secondValue) {
            arr.push(secondValue)
        }
        if (firstValue) {
            arr.push(secondValue)
        }
        return arr
    }
    function onChangeDateSecond(date) {
        setSecondValue(date)
        onChange && onChange(getValue())
    }
    function cleanValue() {
        setFirstValue(undefined)
        setSecondValue(undefined)
        onChange && onChange([])
    }
    return (
        <div className='feature-day-two'>
            <p className='heard-title'>
                <span className='title'>添加特征日</span>
                <span>支持近3个月内特征日设定</span>
            </p>
            <div className='date-box'>
                <div className='close-box'>
                    <Icon type="close-circle" theme="filled" onClick={cleanValue} />
                </div>
                <div className='date-line'>
                    <div>特征日1 </div>
                    <DatePicker
                        value={firstValue}
                        disabledDate={(value) => getDisabledDate(value, secondValue)}
                        onChange={onChangeDateFirst}
                    />
                </div>
                <div className='date-line'>
                    <div>特征日1 </div>
                    <DatePicker
                        value={secondValue}
                        disabledDate={getDisabledDate}
                        disabledDate={(value) => getDisabledDate(value, firstValue)}
                        onChange={onChangeDateSecond}
                    />
                </div>
            </div>

        </div>
    )
}

export default FeatureDayTwo

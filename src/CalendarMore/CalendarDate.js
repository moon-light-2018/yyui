import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'antd'
import './CalendarMore.css'
import './CalendarDate.css'
import { getMonth, weekArr } from './canlendarConfig'
import moment from 'moment'
function CalendarDate(props) {
    const [selectedValue, setSelectedValue] = useState([])//选中的值
    const [canSelectedList, setCanSelectedList] = useState([])//可选数组
    const [isShow, setIsShow] = useState(true)//日历组件是否显示
    const { list = [], onChange, } = props
    const calendarDiv = useRef(null);
    //设计默认值
    useEffect(() => {
        setSelectedValue(props.value || [])
        setCanSelectedList(list.map(one => one.code))
        document.addEventListener('click', outDivClickHandler);
        return () => {
            document.removeEventListener('click', outDivClickHandler);
        }
    }, [])
    function setSelectedValueChange(value) {
        setSelectedValue(value)
        onChange && onChange(value)
    }
    function outDivClickHandler(e) {
        let result = (calendarDiv.current).contains(e.target);
        if (!result) {
            setIsShow(false)
        }
    }
    return (
        <div ref={calendarDiv}>
            <div className='calendar-more' >
                <div className='show-box'  >
                    <div className='selected-show'>
                        {selectedValue.length > 0 ? selectedValue.map(one => <div key={one} className='selected-item days-width'>
                            {one}
                            <Icon type="close" onClick={() => setSelectedValueChange(selectedValue.filter(item => item != one))} />
                        </div>) : <span style={{ color: 'rgba(0, 0, 0, 0.30)' }}>请选择日期</span>}
                    </div>
                    <div className='icon-calendar' onClick={() => setIsShow(!isShow)}><Icon type="calendar" /></div>
                </div>
            </div>
            {isShow ? <CalendarDays
                canSelectedList={canSelectedList}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValueChange}
            /> : null}
        </div>
    )
}
function CalendarDays(props) {
    const nowDate = moment().format('YYYY-M').split('-')
    const [yearNumber, setYearNumber] = useState(nowDate[0])
    const [monthNumber, setMonthNumber] = useState(nowDate[1])
    const { selectedValue = [], canSelectedList = [], setSelectedValue } = props


    function changeDays(value, isSelected) {
        if (isSelected) {
            setSelectedValue(selectedValue.filter(one => one != value))
        } else {
            setSelectedValue([...selectedValue, value])
        }
    }
    const daysList = getMonth(yearNumber, monthNumber)
    function changAddNumber() {
        let number = Number(monthNumber) + 1
        if (number == 13) {
            number = 1
            setYearNumber(Number(yearNumber) + 1)
        }
        setMonthNumber(number)
    }
    function changLessMonth() {
        let number = Number(monthNumber) - 1
        if (number == 0) {
            number = 12
            setYearNumber(Number(yearNumber) - 1)
        }
        setMonthNumber(number)
    }
    return <div className='calendar-days'>
        <div className='calendar-title'>
            <div><Icon type="double-left" onClick={() => setYearNumber((Number(yearNumber) - 1))} /></div>
            <div><Icon type="left" onClick={changLessMonth} /></div>
            <div className='year-number'>{yearNumber}年{monthNumber}月</div>
            <div><Icon type="right" onClick={changAddNumber} /></div>
            <div><Icon type="double-right" onClick={() => setYearNumber(Number(yearNumber) + 1)} /></div>
        </div>
        <div className='calendar-days-content'>
            {weekArr.map(one => <div className='other-days' key={`week-${one}`}>{one}</div>)}
            {daysList.map(one => {
                const nowValue = moment(one.date).format('YYYYMMDD')
                const isSelected = selectedValue.includes(nowValue)
                return <div
                    onClick={() => changeDays(nowValue, isSelected)}
                    className={`common-days ${one.type == 'now' ? 'now-days' : 'other-days'} ${isSelected ? ' common-days-active' : ''}`}
                    key={`${one.type}-${one.value}`}>
                    {one.value}
                </div>
            })}

        </div>
    </div>
}

export default CalendarDate

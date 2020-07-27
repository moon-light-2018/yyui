import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'antd'
import moment from 'moment'
import './CalendarMore.css'

function CalendarMore(props) {
    const [selectedValue, setSelectedValue] = useState([])//选中的值
    const [canSelectedList, setCanSelectedList] = useState([])//可选数组
    const [isShow, setIsShow] = useState(false)//日历组件是否显示
    const { list = [], onChange } = props
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
                        {selectedValue.length > 0 ? selectedValue.map(one => <div key={one} className='selected-item'>
                            {one}
                            <Icon type="close" onClick={() => setSelectedValueChange(selectedValue.filter(item => item != one))} />
                        </div>) : <span style={{ color: 'rgba(0, 0, 0, 0.30)' }}>请选择日期</span>}
                    </div>
                    <div className='icon-calendar' onClick={() => setIsShow(!isShow)}><Icon type="calendar" /></div>
                </div>
            </div>
            {isShow ? <CalendarMonth
                canSelectedList={canSelectedList}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValueChange}
            /> : null}
        </div>
    )
}
function CalendarMonth(props) {
    const [yearNumber, setYearNumber] = useState(moment().year())
    const { selectedValue = [], canSelectedList = [], setSelectedValue } = props
    const monthArr = [
        { name: 1, value: '01' },
        { name: 2, value: '02' },
        { name: 3, value: '03' },
        { name: 4, value: '04' },
        { name: 5, value: '05' },
        { name: 6, value: '06' },
        { name: 7, value: '07' },
        { name: 8, value: '08' },
        { name: 9, value: '09' },
        { name: 10, value: '10' },
        { name: 11, value: '11' },
        { name: 12, value: '12' },
    ]
    function selectedMonth(value, isSelected) {
        if (isSelected) {
            setSelectedValue(selectedValue.filter(one => one != value))
        } else {
            setSelectedValue([...selectedValue, value])
        }
    }

    return <div className='calendar-month'>
        <div className='calendar-content'>
            <div className='calendar-title'>
                <div><Icon type="double-left" onClick={() => setYearNumber(yearNumber - 1)} /></div>
                <div className='year-number'>{yearNumber}年</div>
                <div><Icon type="double-right" onClick={() => setYearNumber(yearNumber + 1)} /></div>
            </div>
            <div className='month-show'>
                {monthArr.map(one => {
                    const value = `${yearNumber}${one.value}`
                    const isCanSelected = canSelectedList.includes(value)
                    const isSelected = selectedValue.includes(value)
                    return isCanSelected ? <div key={one.name} className={`month-box ${isSelected ? ' month-box-active' : ''}`} onClick={() => selectedMonth(value, isSelected)}>{one.name}月</div>
                        : <div key={one.name} className=' month-box month-box-disable'>{one.name}月</div>
                })}
            </div>
        </div>
    </div>
}
export default CalendarMore

import React, { useState, useEffect } from 'react'
import './FeatureDay.css'
import { Switch, Collapse, Checkbox, Tabs, Icon, Popover } from 'antd'
const plainOptions = [
    { name: '元旦节', value: '1243', desc: '20190912' },
    { name: '元旦节', value: '1233', desc: '20190912' },
    { name: '元旦节', value: '12343', desc: '20190912' },
    { name: '元旦节4', value: '12345', desc: '20190912' },
    { name: '元旦节5', value: '12334', desc: '20190912' },
];
function getListToObj(list = plainOptions) {
    let obj = {}
    for (let i = 0; i < list.length; i++) {
        obj[list[i].value] = list[i];

    }
    return obj
}
function FeatureDay(props) {
    const [dateType, setDateType] = useState(1)
    const [holidaysList, setHolidaysList] = useState([])
    const [workingList, setWorkingList] = useState([])
    const [weekendList, setWeekendList] = useState([])
    const [stuHolidays, setStuHolidays] = useState([])
    const { onChange } = props
    function changData(key, value) {
        let obj = { holidaysList, workingList, weekendList, stuHolidays }
        if (key == 'holidaysList') {
            setHolidaysList(value)
        }
        if (key == 'workingList') {
            setWorkingList(value)
        }
        if (key == 'weekendList') {
            setWeekendList(value)
        }
        if (key == 'stuHolidays') {
            setStuHolidays(value)
        }
        obj[key] = value
        onChange && onChange(obj)
    }
    const holidaysMap = getListToObj()
    return (
        <div>
            <CollapsePanel header='已添加特征日' isFoldShow={false}>
                <div className='over-selected-show'>
                    {/* 法定节假日 */}
                    {holidaysList.map(one => <span key={one} className='over-selected-box'>
                        {holidaysMap[one].name}
                        <Icon
                            type="close"
                            onClick={() => setHolidaysList(holidaysList.filter(item => item != one))}
                        />
                    </span>)}
                    {/* 工作日 */}
                    {workingList.map(one => <span key={one} className='over-selected-box'>
                        {holidaysMap[one].name}
                        <Icon
                            type="close"
                            onClick={() => setWorkingList(workingList.filter(item => item != one))}
                        />
                    </span>)}
                    {/* 周末 */}
                    {weekendList.map(one => <span key={one} className='over-selected-box'>
                        {holidaysMap[one].name}
                        <Icon
                            type="close"
                            onClick={() => setWeekendList(weekendList.filter(item => item != one))}
                        />
                    </span>)}
                    {/* 学生假期 */}
                    {stuHolidays.map(one => <span key={one} className='over-selected-box'>
                        {holidaysMap[one].name}
                        <Icon
                            type="close"
                            onClick={() => setStuHolidays(stuHolidays.filter(item => item != one))}
                        />
                    </span>)}
                </div>
            </CollapsePanel>

            <CollapsePanel header='添加法定节假日' switchName='法定节假日'
                cleanData={() => changData('holidaysList', [])}
            >
                <CheckoutAll
                    changData={changData}
                    defaultList={holidaysList}
                    plainOptions={plainOptions}
                    valueKey='holidaysList'
                    key={JSON.stringify(holidaysList)}
                />
            </CollapsePanel>

            <CollapsePanel header='添加工作日/周末' switchName='工作日/周末'
                cleanData={() => {
                    changData('workingList', [])
                    changData('weekendList', [])
                }}
            >
                <div className='day-header'>
                    <div className={`day-item ${dateType == 1 && 'day-item-active'}`} onClick={() => setDateType(1)}>工作日</div>
                    <div className={`day-item ${dateType == 2 && 'day-item-active'}`} onClick={() => setDateType(2)}>周末</div>
                </div>
                {dateType == 1 && <CheckoutAll
                    changData={changData}
                    defaultList={workingList}
                    plainOptions={plainOptions}
                    valueKey='workingList'
                    key={JSON.stringify(workingList)}
                />}
                {dateType == 2 && <CheckoutAll
                    changData={changData}
                    defaultList={weekendList}
                    plainOptions={plainOptions}
                    valueKey='weekendList'
                    key={JSON.stringify(weekendList)}
                />}

            </CollapsePanel>
            <CollapsePanel header='添加学生假期' switchName='学生假期'
                cleanData={() => {
                    changData('stuHolidays', [])
                }}
            >
                <CheckoutAll
                    changData={changData}
                    defaultList={stuHolidays}
                    plainOptions={plainOptions}
                    valueKey='stuHolidays'
                    key={JSON.stringify(stuHolidays)}
                />
            </CollapsePanel>
        </div>
    )
}


export default FeatureDay
function CollapsePanel(props) {
    const [checked, setChecked] = useState(true)
    const [isFold, setIsFold] = useState(true)//ture展示,false折叠
    const { header = '添加法定节假日', switchName, isFoldShow = true, cleanData } = props
    function changeSwitch(value) {
        setChecked(value)
        cleanData && cleanData()
    }
    return <div>
        {switchName && <div>
            {switchName}<Switch checked={checked} size='small' onChange={changeSwitch} />
        </div>}
        {checked ? <div className='collapse-panel'>
            <div className='header-box'>
                {header}
                {/* 是否显示展示折叠按钮 */}
                {isFoldShow && <Icon type={isFold ? 'up' : 'down'} style={{ paddingTop: 10 }} onClick={() => setIsFold(!isFold)} />}
            </div>
            <div className={`fold-show ${isFold ? '' : 'fold-hide'}`}>
                {props.children}
            </div>

        </div> : null}
    </div>
}
//全选组件
function CheckoutAll(props) {
    const [checkedList, setCheckedList] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const { changData, valueKey } = props
    const { plainOptions = [], defaultList = [] } = props
    //监听变化
    useEffect(() => {
        setCheckedList(defaultList)
        const isCheckAll = defaultList.length == plainOptions.length
        setCheckAll(isCheckAll)
    }, [])
    function onChange(value, e) {
        const isChecked = e.target.checked
        let checkedListNow = []
        if (isChecked) {
            checkedListNow = [...checkedList, value]
        } else {
            checkedListNow = checkedList.filter(item => item != value)
        }
        const isCheckAll = checkedListNow.length == plainOptions.length
        setCheckedList(checkedListNow)
        setCheckAll(isCheckAll)
        changData && changData(valueKey, checkedListNow)
    }
    function checkoutAll(e) {
        const value = e.target.checked
        const valueAll = value ? getAllValue() : []
        setCheckedList(valueAll)
        setCheckAll(value)
        changData && changData(valueKey, valueAll)
    }
    function getAllValue() {
        return plainOptions.map(one => one.value)
    }
    return <div className='check-box-group'>
        <Checkbox
            className='checkbox-item'
            onChange={checkoutAll}
            checked={checkAll}
            size='small'
            indeterminate={!checkAll}>全选</Checkbox>
        {
            plainOptions.map(one => <Checkbox
                size='small'
                className='checkbox-item'
                key={one.value}
                onChange={(e) => onChange(one.value, e)}
                checked={checkedList.includes(one.value)}
            >
                <Popover content={one.desc} >
                    {one.name}
                </Popover>

            </Checkbox>)
        }
    </div>
}

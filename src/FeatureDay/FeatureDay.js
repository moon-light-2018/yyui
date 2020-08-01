import React, { useState, useEffect } from 'react'
import './FeatureDay.less'
import { Switch, Collapse, Checkbox, Tabs, Icon, Popover } from 'antd'
const data = [
    {
        "specialDay": [
            {
                "code": "101",
                "des": "20190101,20190102\r\n",
                "name": "元旦"
            },
            {
                "code": "102",
                "des": "20190204,20190205,20190206,20190207,20190208,20190209,20190210",
                "name": "春节"
            },
            {
                "code": "103",
                "des": "20190405,20190406,20190407",
                "name": "清明节"
            },
            {
                "code": "104",
                "des": "20190501,20190502,20190503,20190504",
                "name": "劳动节"
            },
            {
                "code": "105",
                "des": "20190607,20190608,20190609",
                "name": "端午节"
            },
            {
                "code": "106",
                "des": "20190913,20190914,20190915",
                "name": "中秋节"
            },
            {
                "code": "107",
                "des": "20191001,20191002,20191003,20191004,20191005,20191006,20191007",
                "name": "国庆节"
            }
        ],
        "groupName": "法定节假日",
        "groupId": 1
    },
    {
        "specialDay": [
            {
                "code": "109",
                "des": null,
                "name": "1月休息日"
            },
            {
                "code": "111",
                "des": null,
                "name": "2月休息日"
            },
            {
                "code": "113",
                "des": null,
                "name": "3月休息日"
            },
            {
                "code": "115",
                "des": null,
                "name": "4月休息日"
            },
            {
                "code": "117",
                "des": null,
                "name": "5月休息日"
            },
            {
                "code": "119",
                "des": null,
                "name": "6月休息日"
            },
            {
                "code": "121",
                "des": null,
                "name": "7月休息日"
            },
            {
                "code": "123",
                "des": null,
                "name": "8月休息日"
            },
            {
                "code": "125",
                "des": null,
                "name": "9月休息日"
            },
            {
                "code": "127",
                "des": null,
                "name": "10月休息日"
            },
            {
                "code": "129",
                "des": null,
                "name": "11月休息日"
            },
            {
                "code": "131",
                "des": null,
                "name": "12月休息日"
            }
        ],
        "groupName": "周末",
        "groupId": 2
    },
    {
        "specialDay": [
            {
                "code": "108",
                "des": null,
                "name": "1月工作日"
            },
            {
                "code": "110",
                "des": null,
                "name": "2月工作日"
            },
            {
                "code": "112",
                "des": null,
                "name": "3月工作日"
            },
            {
                "code": "114",
                "des": null,
                "name": "4月工作日"
            },
            {
                "code": "116",
                "des": null,
                "name": "5月工作日"
            },
            {
                "code": "118",
                "des": null,
                "name": "6月工作日"
            },
            {
                "code": "120",
                "des": null,
                "name": "7月工作日"
            },
            {
                "code": "122",
                "des": null,
                "name": "8月工作日"
            },
            {
                "code": "124",
                "des": null,
                "name": "9月工作日"
            },
            {
                "code": "126",
                "des": null,
                "name": "10月工作日"
            },
            {
                "code": "128",
                "des": null,
                "name": "11月工作日"
            },
            {
                "code": "130",
                "des": null,
                "name": "12月工作日"
            }
        ],
        "groupName": "工作日",
        "groupId": 3
    },
    {
        "specialDay": [
            {
                "code": "132",
                "des": null,
                "name": "寒假"
            },
            {
                "code": "133",
                "des": null,
                "name": "暑假"
            }
        ],
        "groupName": "学生假期",
        "groupId": 4
    }
]
function getListToObj(list = data) {
    let obj = {}
    for (let i = 0; i < list.length; i++) {
        const specialDayList = list[i].specialDay
        for (let j = 0; j < specialDayList.length; j++) {
            obj[specialDayList[j].code] = {
                ...specialDayList[j],
                groupId: list[i].groupId,
                groupName: list[i].groupName
            };
        }
    }
    return obj
}
function getPlainOptions(index) {
    return data[index] && data[index].specialDay || []
}
function FeatureDay(props) {
    const [dateType, setDateType] = useState(1)
    const [holidaysList, setHolidaysList] = useState([])
    const [workingList, setWorkingList] = useState([])
    const [weekendList, setWeekendList] = useState([])
    const [stuHolidays, setStuHolidays] = useState([])
    const { onChange } = props
    const holidaysMap = getListToObj()
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
    function listFormat() {
        objFormat(holidaysList)
        objFormat(workingList)
        objFormat(weekendList)
        objFormat(stuHolidays)
    }
    function objFormat(list = []) {
        let objNow = {}
        return list.map(one => ({
            code: one,
            name: holidaysMap[one].name
        }))
    }
    return (
        <div>
            <CollapsePanel header='已添加特征日' isFoldShow={false}>
                <div className='over-selected-show'>
                    {/* 法定节假日 */}
                    {holidaysList.map(one => <span key={one} className='over-selected-box'>
                        {holidaysMap[one].name}
                        <Icon
                            type="close"
                            className='close-icon'
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
                    plainOptions={getPlainOptions(0)}
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
                    plainOptions={getPlainOptions(1)}
                    valueKey='workingList'
                    key={JSON.stringify(workingList)}
                />}
                {dateType == 2 && <CheckoutAll
                    changData={changData}
                    defaultList={weekendList}
                    plainOptions={getPlainOptions(2)}
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
                    plainOptions={getPlainOptions(3)}
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
        {switchName && <div className='switch-content'>
            <div className='switch-name'>{switchName}</div>
            <Switch checked={checked} size='small' onChange={changeSwitch} />
        </div>}
        {checked ? <div className='collapse-panel'>
            <div className='header-box'>
                {header}
                {/* 是否显示展示折叠按钮 */}
                {isFoldShow && <Icon type={isFold ? 'up' : 'down'} style={{ paddingTop: 10, }} onClick={() => setIsFold(!isFold)} />}
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
        return plainOptions.map(one => one.code)
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
                key={one.code}
                onChange={(e) => onChange(one.code, e)}
                checked={checkedList.includes(one.code)}
            >
                <Popover content={one.desc} >
                    {one.name}
                </Popover>
            </Checkbox>)
        }
    </div>
}

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
function getPlainOptionsMap(groupId) {
    const obj = {}
    for (let i = 0; i < data.length; i++) {
        obj[data[i].groupId] = data[i].specialDay;
    }
    return obj
}
function FeatureDay(props) {
    const [dateType, setDateType] = useState(1)
    const [selectedList, setSelectedList] = useState([])
    const { onChange } = props
    useEffect(() => {
        setSelectedList(props.value || [])
        console.log("FeatureDay -> (props.value", (props.value))
    }, [])
    function changData(valueKey, list) {
        let nowList = selectedList.filter(item => item.type != valueKey)
        nowList = [...nowList, ...list].map(one => ({
            type: valueKey, ...one
        }))
        setSelectedList(nowList)
        onChange && onChange(nowList)
    }
    function deleteByKey(code) {
        const list = selectedList.filter(one => one.code != code)
        setSelectedList(list)
        onChange && onChange(list)
        console.log("deleteByKey -> list", list)
    }
    function cleanData(type) {
        const list = selectedList.filter(one => one.type != type)
        setSelectedList(list)
        onChange && onChange(list)
    }

    function getSelectedType(type = []) {
        const list = selectedList.filter(one => type.includes(one.type))
        return list
    }
    function changeShowName(name) {
        return name.substring(0, name.length - 3)
    }
    const plainOptionsMap = getPlainOptionsMap()
    return (
        <div>
            <CollapsePanel header='已添加特征日' isFoldShow={false}>
                <div className='over-selected-show'>
                    {/* 法定节假日 */}
                    {selectedList.map(one => <span key={one.code} className='over-selected-box'>
                        {one.name}
                        <Icon
                            type="close"
                            className='close-icon'
                            onClick={() => deleteByKey(one.code)}
                        />
                    </span>)}
                </div>
            </CollapsePanel>
            <CollapsePanel header='添加法定节假日' switchName='法定节假日'
                cleanData={() => cleanData(['holidays'])}
            >
                <CheckoutAll
                    changData={changData}
                    defaultList={getSelectedType('holidays')}
                    plainOptions={plainOptionsMap[1]}
                    valueKey='holidays'
                    key={JSON.stringify(getSelectedType('holidays'))}
                />
            </CollapsePanel>

            <CollapsePanel header='添加工作日/周末' switchName='工作日/周末'
                cleanData={() => cleanData(['working', 'weekend'])}
            >
                <div className='day-header'>
                    <div className={`day-item ${dateType == 1 && 'day-item-active'}`} onClick={() => setDateType(1)}>工作日</div>
                    <div className={`day-item ${dateType == 2 && 'day-item-active'}`} onClick={() => setDateType(2)}>周末</div>
                </div>
                {dateType == 1 ? <CheckoutAll
                    changData={changData}
                    defaultList={getSelectedType('working')}
                    plainOptions={plainOptionsMap[3]}
                    changeShowName={changeShowName}
                    valueKey='working'
                    key={getSelectedType('working')}
                /> : null}
                {dateType == 2 ? <CheckoutAll
                    changData={changData}
                    defaultList={getSelectedType('weekend')}
                    plainOptions={plainOptionsMap[2]}
                    valueKey='weekend'
                    changeShowName={changeShowName}
                    key={JSON.stringify(getSelectedType('weekend'))}
                /> : null}


            </CollapsePanel>
            <CollapsePanel header='添加学生假期' switchName='学生假期'
                cleanData={() => cleanData(['stuHolidays'])}
            >
                <CheckoutAll
                    changData={changData}
                    defaultList={getSelectedType('stuHolidays')}
                    plainOptions={plainOptionsMap[4]}
                    valueKey='stuHolidays'
                    key={JSON.stringify(getSelectedType('stuHolidays'))}
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
    const { plainOptions = [], defaultList = [], changeShowName } = props
    //监听变化
    useEffect(() => {
        setCheckedList(defaultList)
        const isCheckAll = defaultList.length == plainOptions.length
        setCheckAll(isCheckAll)
    }, [])
    function onChange(specialDay, e) {
        const isChecked = e.target.checked
        let checkedListNow = []
        if (isChecked) {
            checkedListNow = [...checkedList, specialDay]
        } else {
            checkedListNow = checkedList.filter(item => item.code != specialDay.code)
        }
        const isCheckAll = checkedListNow.length == plainOptions.length
        setCheckedList(checkedListNow)
        console.log("onChange -> checkedListNow", checkedListNow)
        setCheckAll(isCheckAll)
        changData && changData(valueKey, checkedListNow, isChecked)
    }
    function checkoutAll(e) {
        const value = e.target.checked
        const valueAll = value ? plainOptions : []
        setCheckedList(valueAll)
        setCheckAll(value)
        changData && changData(valueKey, valueAll, value)
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
                onChange={(e) => onChange(one, e)}
                checked={checkedList.filter(item => item.code === one.code).length > 0}
            >
                <Popover content={one.desc} >
                    {changeShowName ? changeShowName(one.name) : one.name}
                </Popover>

            </Checkbox>)
        }
    </div>
}

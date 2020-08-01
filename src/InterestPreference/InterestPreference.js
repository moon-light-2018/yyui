import React, { useState } from 'react'
import { Transfer, Icon } from 'antd';
import { data } from '../data.js';
import './InterestPreference.less'
function InterestPreference(props) {
    const [targetKeys, setTargetKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    let dataMap = {}
    data.map(one => {
        dataMap[(one.name).replace('@', '')] = one
    })
    console.log("TestForm -> dataMap", JSON.stringify(dataMap))

    function handleChange(nextTargetKeys, direction, moveKeys) {
        setTargetKeys(nextTargetKeys)
        props.onChange && props.onChange(nextTargetKeys)
    };

    function handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        const data = [...sourceSelectedKeys, ...targetSelectedKeys]
        setSelectedKeys(data)
    };

    const dataSource = dataMap['param_phone_brand'].options.map(one => ({ key: one.value, ...one }))
    function handleSearch(dir, value) {
        console.log('search:', dir, value);
    };
    function cleanAll() {
        setTargetKeys([])
        props.onChange && props.onChange([])
    }
    const { typeText = 'APP列表' } = props
    return (
        <div className='interest-preference'>
            <div className='interest-header'>
                <div>{typeText}</div>
                <div>已选择列表<a className='delete-icon' onClick={cleanAll}><Icon type="delete" /></a></div>
            </div>
            <div className='transfer-card'>
                <Transfer
                    size="small"
                    showSearch
                    titles={[' ', ' ']}
                    dataSource={dataSource}
                    render={item => item.value}
                    onChange={handleChange}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onSearch={handleSearch}
                    onSelectChange={handleSelectChange}
                />
            </div>
        </div>
    )
}

export default InterestPreference

import React, { useState, useEffect } from 'react'
import { Transfer, Icon } from 'antd';
import './InterestPreference.less'
function InterestPreference(props) {
    const [targetKeys, setTargetKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    useEffect(() => {
        setTargetKeys(props.value)
    }, [])
    function handleChange(nextTargetKeys, direction, moveKeys) {
        setTargetKeys(nextTargetKeys)
        props.onChange && props.onChange(nextTargetKeys)
    };

    function handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        const data = [...sourceSelectedKeys, ...targetSelectedKeys]
        setSelectedKeys(data)
    };
    function handleSearch(dir, value) {
        console.log('search:', dir, value);
    };
    function cleanAll() {
        setTargetKeys([])
        props.onChange && props.onChange([])
    }
    const { typeText = 'APP列表', dataSource, showSearch } = props
    return (
        <div className='interest-preference '>
            <div className='interest-header'>
                <div>{typeText}</div>
                <div>已选择列表<a className='delete-icon' onClick={cleanAll}><Icon type="delete" /></a></div>
            </div>
            <div className='transfer-card'>
                <Transfer
                    size="small"
                    showSearch={showSearch}
                    titles={['全部', '已选']}
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

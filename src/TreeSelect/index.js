import React, { Component } from 'react'
import './index.less'
import { Select } from 'antd';
import './index.less'
import { tree, getObjByTree } from './tree'
import ReactJson from 'react-json-view'
const { Option } = Select;
class TreeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeMapDistance: {},
            selectKeyObj: { 0: { list: [], values: [] } }
        };
    }
    componentDidMount = () => {
        let treeMapDistance = getObjByTree(tree)
        this.setState({
            treeMapDistance: treeMapDistance,
            selectKeyObj: { 0: { list: tree, values: [] } }
        })
    }
    /**
     * 根据values获取下一级的数组
     * @param {*} values 父级元素
     */
    getList = (values) => {
        const { treeMapDistance } = this.state
        return values.map(item => treeMapDistance[item].children || []).flat()
    }
    setSelectKey = (values, key) => {
        const { selectKeyObj } = this.state
        let selectKeyNew = { ...selectKeyObj }
        let list = Object.keys(selectKeyObj)//获取当前数组
        let children = list.splice(key, list.length)//获取下级数据
        for (let i = 0; i < children.length; i++) {//清空下级数据
            const key = children[i];
            delete selectKeyNew[key]
        }
        //补充当次点击数据
        selectKeyNew[key] = {
            list: selectKeyObj[key].list,
            values: values
        }
        //添加下一级list展示项
        const nextList = this.getList(values)
        if (nextList.length > 0) {
            selectKeyNew[key + 1] = {
                list: nextList,
                values: []
            }
        }
        this.setState({
            selectKeyObj: selectKeyNew,
        })
    }
    render() {
        const { selectKeyObj } = this.state
        return (
            <div>
                {(Object.keys(selectKeyObj).map((selectKey, index) => <Select
                    mode="multiple"
                    value={selectKeyObj[selectKey].values}
                    onChange={(values) => this.setSelectKey(values, index)}
                    key={index}
                    className='multiple-select-item'>
                    {selectKeyObj[selectKey].list.map(one => <Option value={one.value} key={one.value}>
                        {one.name}
                    </Option>)}
                </Select>))}
                <div>
                    <h1>选中数据结果展示</h1>
                    <div style={{ display: 'flex' }}>
                        {Object.keys(selectKeyObj).map((key, index) => {
                            return <div style={{ marginRight: 20 }}>
                                <h1>{index + 1}</h1>
                                <h2>Select选中值</h2>
                                <ReactJson src={selectKeyObj[key].values} theme='harmonic' />
                                <h2>Select展示列表</h2>
                                <ReactJson src={selectKeyObj[key].list} theme='harmonic' />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default TreeSelect;
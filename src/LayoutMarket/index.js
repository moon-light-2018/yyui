import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import './index.less'
class LayoutMarket extends Component {
    componentDidMount() {
        window.top.postMessage('投前策略', '*');
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    linkTo = (type) => {
        this.props.history.push(`/app/marketing/advertStrategy/${type}`)
    }
    render() {
        const { selectedKey, children } = this.props
        const meauList = [
            { name: '创建营销策略', iconType: 'file-add', key: 'editTask' },
            { name: '营销策略列表', iconType: 'unordered-list', key: 'taskList' },
            { name: '点位管理', iconType: 'environment', key: 'siteManage' },
        ]
        return (
            <div className='layout-market-container'>
                {/*左侧tabBtn*/}
                <div className='left-tab-container'>

                    {/*10010502*/}
                    {meauList.map(item => {
                        const isSelectedClassName = (item.key === selectedKey ? "tab-active" : '')
                        return <div key={item.key}
                            className={`tab-item ${isSelectedClassName}`} >
                            <a onClick={() => this.linkTo(item.key)}>
                                <div className={` ${isSelectedClassName}`}>
                                    <Icon type={item.iconType} className='icon-dash' />
                                    <b>{item.name}</b>
                                </div>
                            </a>
                        </div>
                    })
                    }
                </div>
                {/*左侧列表*/}
                <div >
                    {children}
                </div>
            </div>
        );
    }
}
export default LayoutMarket
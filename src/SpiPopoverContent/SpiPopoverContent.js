import React, { PureComponent } from 'react'
import './SpiPopoverContent.less'
import { Table, Popover, Icon } from 'antd';
class SpiPopoverContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const columns = [
            {
                title: '指代含义',
                dataIndex: 'name',
                key: 'name',
                width: 60,
                align: 'center'
            },
            {
                title: '富裕指数',
                dataIndex: 'pointNumber',
                key: 'pointNumber',
                width: 60,
                align: 'center'
            },
            {
                title: '占比',
                dataIndex: 'percentage',
                key: 'percentage',
                width: 40,
                align: 'center'
            },
            {
                title: '个人年收入参考',
                dataIndex: 'money',
                key: 'money',
                width: 80,
                align: 'center'
            },
        ]

        return (
            <Popover
                content={
                    <div className='spi-popover-content'>
                        <div className='text'>
                            富裕指数是我们通过用户多种行为特征，如：居住社区房价，手机终端价格，休闲娱乐地个数，境内外出行量，出行方式（飞机/高铁/公路）、话费等多源数据指标，进行机器学习建模打造的专利标签之一。我们对应不同级别城市的个人年收入情况，为用户打1-8级的指数。叠加不同城市富裕指数对照个人年收入的对表
                        </div>
                        <div className='table-content'>
                            {list.map(one => <div className='row-type'>
                                <div className='title'>{one.title}</div>
                                <Table size='small' dataSource={one.content} columns={columns} pagination={false} className='table' bordered />
                            </div>)}
                        </div>
                    </div>
                }>
                <Icon type={'info-circle'} style={{ marginLeft: 4 }} />
            </Popover>
        );
    }
}

export default SpiPopoverContent;

const list = [
    {
        title: '特一线-北上广深',
        content: [
            { name: '低收入', pointNumber: '1、2', percentage: '9%', money: '5W' },
            { name: '中等收入', pointNumber: '3', percentage: '40%', money: '5-10W' },
            { name: '小康', pointNumber: '4', percentage: '32%', money: '10-18W' },
            { name: '中产', pointNumber: '5', percentage: '14%', money: '18-30W' },
            { name: '富裕', pointNumber: '6', percentage: '5%', money: '30-50W' },
            { name: '富人', pointNumber: '7、8', percentage: '1%', money: '50W以上' }
        ]
    }, {
        title: '一线-成都、杭州、天津等',
        content: [
            { name: '低收入', pointNumber: '1、2', percentage: '12%', money: '3W' },
            { name: '中等收入', pointNumber: '3', percentage: '40%', money: '3-7W' },
            { name: '小康', pointNumber: '4', percentage: '28%', money: '7-10W' },
            { name: '中产', pointNumber: '5', percentage: '14%', money: '10-15W' },
            { name: '富裕', pointNumber: '6', percentage: '5%', money: '15-30W' },
            { name: '富人', pointNumber: '7、8', percentage: '1%', money: '30W以上' },

        ]
    }, {
        title: '二线-石家庄、大连、合肥等',
        content: [
            { name: '低收入', pointNumber: '1、2', percentage: '10%', money: '2.5W' },
            { name: '中等收入', pointNumber: '3', percentage: '40%', money: '2.5-6W' },
            { name: '小康', pointNumber: '4', percentage: '31%', money: '6-8W' },
            { name: '中产', pointNumber: '5', percentage: '14%', money: '8-12W' },
            { name: '富裕', pointNumber: '6', percentage: '5%', money: '12-25W' },
            { name: '富人', pointNumber: '7、8', percentage: '1%', money: '25W以上' },
        ]
    }, {
        title: '三线-廊坊、淄博、邯 郸等',
        content: [
            { name: '低收入', pointNumber: '1、2', percentage: '15%', money: '2W' },
            { name: '中等收入', pointNumber: '3', percentage: '44%', money: '2-5W' },
            { name: '小康', pointNumber: '4', percentage: '25%', money: '5-7W' },
            { name: '中产', pointNumber: '5', percentage: '11%', money: '7-10W' },
            { name: '富裕', pointNumber: '6', percentage: '4%', money: '10-20W' },
            { name: '富人', pointNumber: '7、8', percentage: '1%', money: '20W以上' },
        ]
    }, {
        title: '四线-清远、渭南等',
        content: [
            { name: '低收入', pointNumber: '1、2', percentage: '19%', money: '2W' },
            { name: '中等收入', pointNumber: '3', percentage: '45%', money: '2-4W' },
            { name: '小康', pointNumber: '4', percentage: '24%', money: '4-6W' },
            { name: '中产', pointNumber: '5', percentage: '10%', money: '6-8W' },
            { name: '富裕', pointNumber: '6', percentage: '3%', money: '8-20W' },
            { name: '富人', pointNumber: '7、8', percentage: '0%', money: '20W以上' },
        ]
    }
]
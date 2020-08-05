import React from 'react'
import { Form, Button, Input, Switch, Tabs } from 'antd'
import InterestPreference from './InterestPreference'
import { dataParamList } from '../data.js';
import './InterestPreference.less'
const { TabPane } = Tabs;

function TestForm(props) {
    const dataSourcePhone = dataParamList['param_phone_brand'].options.map(one => ({ key: one.value, ...one }))
    const dataSourceAPP = dataParamList['param_app'].options.map(one => ({ key: one.value, ...one }))
    const { getFieldDecorator, getFieldValue, } = props.form;
    return (
        <div className='step-second'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="手机偏好" key="1">
                    <Form.Item style={{ width: 300 }}>
                        {getFieldDecorator('param_phone_brand', {
                            initialValue: [],
                            valuePropName: 'checked',
                        })(
                            <InterestPreference dataSource={dataSourcePhone} showSearch={false} typeText='手机列表' />
                        )}
                    </Form.Item>
                </TabPane>
                <TabPane tab="APP偏好" key="2">
                    <div className='transfer-app-card'>
                        <Form.Item style={{ width: 300 }}>
                            {getFieldDecorator('param_app', {
                                initialValue: [],
                            })(
                                <InterestPreference dataSource={dataSourceAPP} showSearch={true} />
                            )}
                        </Form.Item>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default TestForm

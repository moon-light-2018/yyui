import React from 'react'
import { Form, Button, Input, Switch, Tabs } from 'antd'
import InterestPreference from './InterestPreference'
const { TabPane } = Tabs;
function TestForm(props) {
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    const { getFieldDecorator, getFieldValue, } = props.form;
    //设置添加特征日
    function setAddFeatureDay() {
        props.form.setFieldsValue({ switchValue: false })
    }
    return (
        <div>
            <Form>
                <Tabs>
                    <TabPane tab="手机偏好" key="1">
                        <Form.Item style={{ width: 300 }}>
                            {getFieldDecorator('iphone', {
                                initialValue: [],
                                valuePropName: 'checked',
                            })(
                                <InterestPreference />
                            )}
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="APP偏好" key="2">
                        <Form.Item style={{ width: 300 }}>
                            {getFieldDecorator('password', {
                                initialValue: [],
                            })(
                                <InterestPreference />
                            )}
                        </Form.Item>
                    </TabPane>
                </Tabs>
                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

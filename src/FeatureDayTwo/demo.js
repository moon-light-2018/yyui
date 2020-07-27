import React from 'react'
import { Form, Button, Input, Switch } from 'antd'
import FeatureDayTwo from './FeatureDayTwo'

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
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('switchValue', {
                        initialValue: true,
                        valuePropName: 'checked',
                    })(
                        <Switch />
                    )}
                </Form.Item>
                {getFieldValue('switchValue') ? <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('password', {
                        initialValue: [],

                    })(
                        <FeatureDayTwo onClose={setAddFeatureDay} />
                    )}
                </Form.Item>
                    : null}

                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

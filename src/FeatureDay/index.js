import React from 'react'
import { Form, Button, Input } from 'antd'
import FeatureDay from './FeatureDay'
import FeatureDayList from './FeatureDayList'
function TestForm(props) {
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <div>
            <Form>
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('password', {
                        initialValue: [],
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <FeatureDay />
                    )}
                </Form.Item>
                {/* <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('password', {
                        initialValue: [],
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <FeatureDayList />
                    )}
                </Form.Item> */}
                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

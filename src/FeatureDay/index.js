import React from 'react'
import { Form, Button, Input } from 'antd'
import FeatureDay from './FeatureDay'
const data = [
    {
        "code": "202002",
        "name": "202002"
    },
    {
        "code": "201902",
        "name": "201902"
    },
    {
        "code": "202003",
        "name": "202003"
    },
    {
        "code": "201905",
        "name": "201905"
    },
    {
        "code": "201803",
        "name": "201803"
    },
    {
        "code": "202005",
        "name": "202005"
    }
]
function TestForm(props) {
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
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
                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

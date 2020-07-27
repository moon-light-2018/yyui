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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    return (
        <div>
            <Form>
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('passsword', {
                        initialValue: true,
                        valuePropName: 'checked',
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('password', {
                        initialValue: [],

                    })(
                        <FeatureDayTwo />
                    )}
                </Form.Item>

                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

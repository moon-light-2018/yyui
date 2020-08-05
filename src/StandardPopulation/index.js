import React, { useEffect, useState } from 'react'
import { Form, Button, Steps, Switch } from 'antd'
import StandardPopulation from './StandardPopulation'
const { Step } = Steps;
function TestForm(props) {
    const [state, setstate] = useState(0)
    useEffect(() => {
        console.log(state);
    }, [state])
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        setstate(state + 1)
    }
    const { getFieldDecorator, getFieldValue, } = props.form;
    //设置添加特征日
    function setAddFeatureDay() {
        props.form.setFieldsValue({ switchValue: false })
    }
    return (
        <div>
            <Form>
                <StandardPopulation {...props.form} a={state} />
                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

import React, { useEffect, useState } from 'react'
import { Form, Button, Input } from 'antd'
import CalendarMore from './CalendarMore'
import CalendarDate from './CalendarDate'
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
    const [date, setDate] = useState([])
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    useEffect(() => {
        setTimeout(() => {
            setDate(["202003", "202002"])
        }, 2000);
    }, [])
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    return (
        <div>
            <Form>
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('@param_month', {
                        initialValue: date,
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <CalendarMore list={data} key={JSON.stringify(date)} />
                    )}
                </Form.Item>
                <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('@param_month23', {
                        initialValue: ["20200322", "20200212"],
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <CalendarDate list={data} key={JSON.stringify(date)} />
                    )}
                </Form.Item>
                <Button onClick={submit}>提交</Button>
            </Form>
        </div>
    )
}
const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

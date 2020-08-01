import React, { Component } from 'react'
import { Form, Button, Radio, Checkbox } from 'antd'
import FeatureDay from './FeatureDay'
import FeatureDayList from './FeatureDayList'
import TestMap from './TestMap'
const list = [
    { code: 1, name: '预置点位名称' },
    { code: 2, name: '预置点位名称' },
    { code: 3, name: '预置点位名称' }
]
const values = [
    {
        "code": "110",
        "des": null,
        "name": "2月工作日"
    },
    {
        "code": "112",
        "des": null,
        "name": "3月工作日"
    },
    {
        "code": "132",
        "des": null,
        "name": "寒假"
    },
    {
        "code": "127",
        "des": null,
        "name": "10月休息日"
    },
    {
        "code": "129",
        "des": null,
        "name": "11月休息日"
    },
    {
        "code": "103",
        "des": "20190405,20190406,20190407",
        "name": "清明节"
    },
]
//处理特征日参数
function addTypeByValues(list = values) {
    // holidays,working,weekend,stuHolidays
    return list.map(item => {
        let type = 'holidays'
        const name = item.name
        if (name.includes('休息日')) {
            type = 'weekend'
        } else if (name.includes('节')) {
            type = 'holidays'
        } else if (name.includes('工作日')) {
            type = 'working'
        } else {
            type = 'stuHolidays'
        }
        return { ...item, type }
    })
}
function TestForm(props) {
    function submit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    function changeReferenceTime(e) {
        if (e.target.value === '2') {
            props.form.setFieldsValue({ 'password': [] })
        }
    }
    const { getFieldDecorator, getFieldValue } = props.form;
    return (
        <div>
            <TestMap />
            <Form>
                {/* <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('passworddd', {
                        // initialValue: [],
                        // rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Checkbox.Group style={{ width: '100%' }} className='back-color'>
                          
                        </Checkbox.Group>
                    )}
                </Form.Item> */}
                {list.map(one => <div key={one.code}>
                    <GroupMapPoint {...one} />
                </div>)}
                <Form.Item label='参考时间'>
                    {getFieldDecorator('referenceTime', {
                        initialValue: "1",
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Radio.Group onChange={changeReferenceTime}>
                            <Radio value="1">参考月份</Radio>
                            <Radio value="2">特征日</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                {getFieldValue('referenceTime') === '2' ? <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('password', {
                        initialValue: addTypeByValues(),
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <FeatureDayList />
                    )}
                </Form.Item> : null}
                {getFieldValue('referenceTime') === '1' ? <Form.Item style={{ width: 300 }}>
                    {getFieldDecorator('dd', {
                        initialValue: [],
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <input />
                    )}
                </Form.Item> : null}
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
class GroupMapPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.isChecked || true
        };
    }
    onChange = (e, code, name) => {
        console.log('checked = ', e.target.checked, code, name);
        this.setState({
            checked: e.target.checked,
        });
    };
    render() {
        const { code, name, isChecked } = this.props
        return (
            <Checkbox
                checked={this.state.checked}
                onChange={(e) => this.onChange(e, code, name)}
            >
                {name}
            </Checkbox>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create('asd')(TestForm);
export default WrappedHorizontalLoginForm 

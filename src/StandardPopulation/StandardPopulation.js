import React, { useEffect } from 'react'
import { Form, Checkbox, Slider, Row, Col, Select, Icon } from 'antd'
import './StandardPopulation.less'
import { dataParamList } from '../data'
const { Option } = Select;
const ageInitValue = [{ key: '5', label: '19-24岁' }]
function StandardPopulation(props) {
    useEffect(() => {
        console.log(333);
    }, ['a'])
    const formLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    }
    const formLayout2 = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }
    const { getFieldDecorator, getFieldValue, } = props;
    function ageVali(rule, value, callback) {
        if (value[0] != value[1]) {
            callback()
        } else {
            callback("年龄值不能重合")
        }
    }
    return (
        <div className='standard-population' >
            <Form.Item style={{ width: 300 }} label='性别' {...formLayout2}>
                {getFieldDecorator('param_gender', {
                    initialValue: [1],
                    rules: [{ required: true, message: '请选择性别' }],
                })(
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Checkbox value={1}>男</Checkbox>
                        <Checkbox value={2}>女</Checkbox>
                    </Checkbox.Group>
                )}
            </Form.Item>
            <Form.Item label='年龄' {...formLayout}>
                {
                    getFieldDecorator('param_age', {
                        rules: [
                            {
                                required: true,
                                message: '请选择年龄'
                            },
                        ],
                        initialValue: ageInitValue
                    })
                        (
                            <Select
                                mode="multiple"
                                className='multiple-select'
                                labelInValue={true}
                            >
                                {dataParamList.param_age.options.map(one => <Option key={one.item} value={one.value} >{one.item}</Option>)}
                            </Select>
                        )
                }
            </Form.Item>
            <Form.Item label={<div>富裕指数<Icon type="info-circle" /></div>} {...formLayout}>
                {
                    getFieldDecorator('param_spi', {
                        rules: [
                            {
                                required: true,
                                message: '请选择富裕指数'
                            },
                        ],
                        initialValue: [{ key: 1, label: '1级' }]
                    })
                        (
                            <Select
                                mode="multiple"
                                className='multiple-select width-spi'
                                labelInValue={true}
                            >
                                {dataParamList.param_spi.options.map(one => <Option key={one.item} value={one.value} >{one.item}</Option>)}
                            </Select>
                        )
                }
            </Form.Item>
        </div>
    )
}
export default StandardPopulation
function StepLayout(props) {
    return <Row>
        <Col span={16}>{props.children}</Col>
        <Col span={8}>
            <div className='step-after'>{props.value}{props.unit}</div>
        </Col>
    </Row>
}
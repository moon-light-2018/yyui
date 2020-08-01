import React, { useEffect } from 'react'
import { Form, Checkbox, Slider, Row, Col } from 'antd'
import './StandardPopulation.less'
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
                <StepLayout
                    value={(getFieldValue('param_age') || [19, 29]).join('-')}
                    unit='岁'>
                    {getFieldDecorator('param_age', {
                        initialValue: [19, 29],
                        rules: [{ required: true, message: '请选择年龄' },
                        { validator: ageVali }],

                    })(
                        <Slider style={{ width: '96%' }}
                            range
                            step={getFieldValue('param_spi') > 24 ? 4 : 5}
                            min={19}
                            max={69}
                        />
                    )}
                </StepLayout>
            </Form.Item>
            <Form.Item label='富裕指数' {...formLayout}>
                <StepLayout
                    value={(getFieldValue('param_spi') || [1, 2]).join('-')}
                    unit='级'>
                    {getFieldDecorator('param_spi', {
                        initialValue: [1, 2],
                        rules: [{ required: true, message: '请选择年龄' }],
                    })(
                        <Slider style={{ width: '96%' }}
                            range
                            min={1}
                            max={8}
                        />
                    )}
                </StepLayout>
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
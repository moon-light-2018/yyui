import React, { Component } from 'react'
import './index.less'
import { Slider, InputNumber, Row, Col } from 'antd';

class IntegerStep extends React.Component {
    state = {
        inputValue: 1,
    };
    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };
    render() {
        const { inputValue } = this.state;
        return (
            <Row className='slider-step'>
                <Col span={3}>距离</Col>
                <Col span={14}>
                    <Slider
                        min={0.5}
                        max={5}
                        step={0.1}
                        onChange={this.onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={0.5}
                        max={20}
                        step={0.1}
                        style={{ marginLeft: 16 }}
                        value={inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}


export default IntegerStep
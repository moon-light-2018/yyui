import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarMore from './CalendarMore'
import SexChart from './SexChart/SexChart'
import FeatureDay from './FeatureDay'
import FeatureDayTwo from './FeatureDayTwo/demo'
import InterestPreference from './InterestPreference'
import StandardPopulation from './StandardPopulation'
import MultipleButton from './MultipleButton/MultipleButton'
import './styles/main.less'
import './styles/new.less'
import { Tabs, Form } from 'antd';
const { TabPane } = Tabs;
function App(props) {

  return (
    <div className='container-all' >
      {/* <StandardPopulation />
      <Form>
        <InterestPreference form={props.form} />
      </Form> */}
      <Tabs className='demo-show-tab'>
        <TabPane tab="多选的盒子" key="MultipleButton">
          <MultipleButton />
        </TabPane>

        <TabPane tab="全选组件逻辑+下拉" key="2">
          <FeatureDay />
        </TabPane>

        <TabPane tab="多选日期组件" key="1">
          <CalendarMore />
        </TabPane>

        <TabPane tab="日期组合操作" key="3">
          <FeatureDayTwo />
        </TabPane>
        <TabPane tab="div导出为图片+性别渲染" key="4">
          <SexChart />
        </TabPane>
      </Tabs>
    </div>

  );
}

export default Form.create()(App);


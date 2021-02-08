import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarMore from './CalendarMore'
import SexChart from './SexChart/SexChart'
import FeatureDay from './FeatureDay'
import FeatureDayTwo from './FeatureDayTwo/demo'
import InterestPreference from './InterestPreference'
import StandardPopulation from './StandardPopulation'
import MultipleButton from './MultipleButton/MultipleButton'
import SliderStep from './SliderStep'
import LayoutMarket from './LayoutMarket'
import CssBase from './CssBase'
import StarRate from './StarRate'
import './styles/main.less'
import './styles/new.less'
import { Tabs, Form, Layout } from 'antd';
import { Collapse } from 'antd';
import TreeSelect from './TreeSelect'
const { Panel } = Collapse;
const { TabPane } = Tabs;
function App(props) {

  return (
    <div className='container-all' >
      {/* <SliderStep /> */}
      {/* <LayoutMarket > */}
      {/* <StandardPopulation />
      <Form>
        <InterestPreference form={props.form} />
      </Form> */}
      <CssBase />
      <Tabs className='demo-show-tab'>
        <TabPane tab='树形数据多选自动查找' key='TreeSelect'>
          <TreeSelect />
        </TabPane>
        <TabPane tab="星星评分组件" key="6">
          <StarRate number={1.4} />
          <StarRate number={4.7} />
          <StarRate number={8.6} />
          <StarRate number={10} />
        </TabPane>
        <TabPane tab="div导出为图片+性别渲染" key="4">
          <SexChart />
        </TabPane>
        <TabPane tab="多选日期组件" key="1">
          <CalendarMore />
        </TabPane>
        <TabPane tab="多选的盒子" key="MultipleButton">
          <MultipleButton />
        </TabPane>
        <TabPane tab="全选组件逻辑+下拉" key="2">
          <FeatureDay />
        </TabPane>
        <TabPane tab="日期组合操作" key="3">
          <FeatureDayTwo />
        </TabPane>

      </Tabs>
      {/* </LayoutMarket> */}
    </div>

  );
}

export default Form.create()(App);


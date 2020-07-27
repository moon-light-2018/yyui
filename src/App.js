import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarMore from './CalendarMore'
import SexChart from './SexChart/SexChart'
import FeatureDay from './FeatureDay'
import FeatureDayTwo from './FeatureDayTwo/demo'
import './styles/main.less'
import './new.less'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function App() {

  return (
    <div className='container-all' >

      <Tabs className='demo-show-tab'>
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

export default App;

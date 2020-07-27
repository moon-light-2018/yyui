import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarMore from './CalendarMore'
import SexChart from './SexChart/SexChart'
import FeatureDay from './FeatureDay'
import FeatureDayTwo from './FeatureDayTwo/demo'
import Copy from 'react-copy';
import './styles/main.less'
import { Button } from 'antd';
function App() {

  return (
    <div className='container' >
      <Copy textToBeCopied={`1231.23`}>
        <Button type='primary'>
          Copy the text please please
        </Button>
      </Copy>

      <h2>多选日期组件</h2>
      <CalendarMore />

      <FeatureDayTwo />
      <FeatureDay />
      <h1>下载</h1>
      <SexChart />

    </div>

  );
}

export default App;

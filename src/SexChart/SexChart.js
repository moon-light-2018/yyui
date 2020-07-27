import React, { useState, useEffect } from 'react';
import './SexChart.css';
import { Icon, Tooltip } from 'antd'
import { download } from './download'
import numeral from 'numeral'
console.log("download", download)
function SexChart() {
    const data = {
        "type": 0,
        "month": "202002",
        "cityName": "北京市",
        "name": "蓝色港湾",
        "rank": 54,
        "male": 74926,
        "female": 69975,
        "age0018": 2352,
        "age1924": 54,
        "age2529": 20073,
        "age3034": 33530,
        "age3539": 24116,
        "age4044": 14284,
        "age4549": 11969,
        "age5054": 8562,
        "age5559": 6735,
        "age6064": 3911,
        "age6569": 2640,
        "age70up": 1645,
        "spi1": 54,
        "spi2": 5632,
        "spi3": 57345,
        "spi4": 57253,
        "spi5": 20453,
        "spi6": 4013,
        "spi7": 144,
        "spi8": 7
    }
    const [boxWidth, setBoxWidth] = useState(0)
    useEffect(() => {
        setBoxWidth(document.getElementById('js-sex-box-id').clientWidth)
        window.addEventListener('resize', resizeWindow)
        return () => {
            window.removeEventListener('resize', resizeWindow)
        }
    }, [])
    function resizeWindow() {
        setBoxWidth(document.getElementById('js-sex-box-id').clientWidth)
    }

    const ageKeys = Object.keys(data).filter(one => one.search('age') != -1)
    const list = ageKeys.map((one, index) => {
        const type = one.split('age')[1]
        let start = type.slice(0, 2)
        let end = type.slice(2, 4)
        let typeName = `${start}-${end}`
        if (start == '00') {
            typeName = end + '以下'
        }
        if (end == 'up') {
            typeName = start + '以上'
        }
        return {
            male: data[one],
            type: typeName
        }
    })

    function getPercentage(number) {
        const newArr = list.map((one) => one.female > one.male ? one.female : one.male).sort(function (a, b) {
            return a - b;
        })
        const maxNumber = newArr[newArr.length - 1]
        const size = (boxWidth - 130) / 6
        const percentage = (number / maxNumber) * size
        const count = percentage < 1 ? Math.ceil(percentage) : Math.round(percentage)
        return count
    }
    function getNumber(number) {
        let unit = ''
        let numberFormat = number
        if (number > 9999) {
            numberFormat = numeral(numberFormat / 10000).format(',')
            unit = '万'
        }
        return numberFormat + unit
    }
    function getPre(key) {
        const count = data.male + data.female
        return numeral(data[key] / count).format('0.0%')
    }
    return (
        <div className='sex-chart' id='js-sex-box-id'>
            <div className='sex-chart-title'>
                年龄性别
                <div className='download-box'>
                    <Icon type="download" className='download-icon' onClick={() => download('js-download-id')} />
                    <div className='save-img'>保存为图片</div>
                </div>
            </div>
            <div id='js-download-id'>
                <div className='sum-count'>
                    <div className='male-number'>{getNumber(data.male)}人</div>
                    <div className='male'>男性：{getPre('male')}</div>
                    {/* <div className='male-type'></div> */}
                    <div className='female'>女性：{getPre('female')}</div>
                    <div className='female-number'>{getNumber(data.female)}人</div>
                </div>
                <div>
                    {list.map((one, index) => <div key={index} className='row-sex-number'>
                        <div className='male-number number-width'>{getNumber(one.male)}</div>
                        <div className='male person-width'>
                            <Tooltip>
                                <PersonNumber number={getPercentage(one.male)} />
                            </Tooltip>

                        </div>
                        <div className='male-type'>{one.type}</div>
                        {/* <div className='female person-width'>
            <PersonNumber number={getPercentage(one.female)} sex='female' />
          </div>
          <div className='female-number number-width'>{one.female}</div> */}
                    </div>)}

                </div>
            </div>
        </div>

    );
}

export default SexChart;

function PersonNumber({ number, sex = 'male' }) {
    let arr = []
    for (let index = 0; index < number; index++) {
        arr.push(index)
    }

    return <PersonLine sex={sex} number={number}>
        <div className='person-number'>{arr.map((one, index) => {
            return sex == 'male' ?
                <div className='blue-person' key={index}><SvgPerson fill={'#32C5FF'} /></div>
                : <div className='pink-person' key={index + 'pink'}><SvgPerson /></div>
        })}
        </div></PersonLine>
}
function PersonLine(props) {
    const { sex, number = 0 } = props
    const isMale = sex == 'male'
    const leftWidth = `calc(100% - ${number * 6 + 10}px)`
    const left = (isMale ? '0' : `${number * 6 + 10}px`)
    return <div className='person-line-box'>
        <div className='person-line'
            style={{ width: leftWidth, left: left, borderColor: isMale ? '' : '#E380AD' }}></div>
        <div className={`content ${isMale ? 'right-person' : ''}`}
            style={{ width: `${number * 6}px` }}
        >{props.children}</div>
    </div>
}

function SvgPerson({ fill = '#E380AD' }) {
    return <svg>
        <path d="M2.99986926,4 C3.86133561,4 4.62424822,4.55622026 4.88774211,5.37640026 L5.9536086,8.69413328 C6.12253412,9.21994941 5.83321712,9.78314881 5.30740098,9.95207434 C5.20855157,9.98383105 5.10535957,10 5.00153426,10 L3.96365973,10 L3.96365973,13 L2.03607879,13 L2.03607879,10 L0.998204263,10 C0.445919513,10 -0.00179573724,9.55228475 -0.00179573724,9 C-0.00179573724,8.89617469 0.0143732171,8.79298269 0.0461299237,8.69413328 L1.11199641,5.37640026 C1.3754903,4.55622026 2.13840291,4 2.99986926,4 Z M2.99986926,0 C3.93137112,0 4.68650258,0.783501688 4.68650258,1.75 C4.68650258,2.71649831 3.93137112,3.5 2.99986926,3.5 C2.0683674,3.5 1.31323594,2.71649831 1.31323594,1.75 C1.31323594,0.783501688 2.0683674,0 2.99986926,0 Z" stroke="none" fill={fill}></path>
    </svg>
}
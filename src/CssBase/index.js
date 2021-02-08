import { Tooltip } from 'antd'
import MultiClamp from 'react-multi-clamp';
import React from 'react'
import './index.less'
function CssBase() {
    return (
        <div className='css-base'>
            <section className='item'>
                <h2>不换行,单行多余展示...</h2>
                <NowrapHiddenEllipsis value={'我是小白兔、野区小公主'} />
                <h2>不换行,多行多余展示...</h2>
                <MultiClamp ellipsis="..." clamp={2}>
                    我是小白兔、野区小公主;我是小白兔、野区小公主;我是小白兔、野区小公主
                </MultiClamp>
            </section>
        </div>
    )
}
export const NowrapHiddenEllipsis = ({ value }) => {
    return <Tooltip title={value}>
        <div className='nowrap-hidden-ellipsis'>
            {value}
        </div>
    </Tooltip>
}
export default CssBase

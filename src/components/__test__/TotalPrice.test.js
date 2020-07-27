import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from "../TotalPrice";
const props = {
    income: 100,
    outcome: 200
}
describe('test Totalprice', () => {
    it('income&outcome', () => {
        const wrapper = shallow(<TotalPrice {...props} />)
        expect(wrapper.find('.income span').text() * 1).toEqual(100)
        expect(wrapper.find('.outcome span').text() * 1).toEqual(200)
    })
})
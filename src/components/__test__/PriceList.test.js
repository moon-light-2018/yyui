import React from 'react';
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import { items, categoryData } from '../../testData'
const itemsWithCategory = items.map(item => {
    item.category = categoryData[item.cid]
    return item
})
const props = {
    items: itemsWithCategory,
    onModifyItem: () => { },
    onDeleteItem: () => { }
}
let wrapper
describe('test priceList', () => {
    beforeEach(() => {
        wrapper = shallow(<PriceList {...props} />)
    })
    it('should render the component snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('should render correct', () => {
        expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length);
    });
})


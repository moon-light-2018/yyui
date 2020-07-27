import React, { Component } from 'react'
import logo from '../logo.svg';
import { items, categoryData, newItems } from '../testData'
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import { TYPE_INCOME, TYPE_OUTCOME, LIST_VIEW, CHART_VIEW, parseToYearAndMonth, padLeft } from '../utility'

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        };
    }
    changeData = (year, month) => {
        this.setState({
            currentDate: {
                year: year,
                month: month
            }
        })
    }
    changeView = (value) => {
        this.setState({
            tabView: value
        })
    }
    createItem = () => {
        this.setState({
            items: [...this.state.items, newItems]
        })
    }
    modifyItem = (modifyItem) => {
        const modifyedItems = this.state.items.map(item => {
            if (item.id == modifyItem.id) {
                return { ...item, title: '更新' }
            } else {
                return item
            }
        })
        this.setState({
            items: modifyedItems
        })
    }
    deleteItem = (deleteItem) => {
        const filterItem = this.state.items.filter(item => item.id != deleteItem.id)
        this.setState({
            items: filterItem
        })
    }
    render() {
        const { items, currentDate, tabView } = this.state
        const itemsWithCategory = items.map(item => {
            item.category = categoryData[item.cid]
            return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })

        let totalInCome = 0
        let totalOutCome = 0
        itemsWithCategory.forEach(item => {
            if (item.category && item.category.type == TYPE_INCOME) {
                totalInCome += item.price
            } else {
                totalOutCome += item.price
            }
        });
        return (
            <React.Fragment>
                <header className='App-header'>
                    <div className='row mb-5'>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <MonthPicker month={currentDate.month} year={currentDate.year}
                                onChange={this.changeData}
                            />

                        </div>
                        <div className='col'>
                            <TotalPrice income={totalInCome} outcome={totalOutCome} />
                        </div>
                    </div>
                </header>
                <div className='content-area py-3 px-3'>
                    <ViewTab activeTab={tabView} onTabChange={this.changeView} />
                    <CreateBtn onClick={this.createItem} />
                    {tabView == LIST_VIEW ? <PriceList
                        items={itemsWithCategory}
                        onModifyItem={this.modifyItem}
                        onDeleteItem={this.deleteItem}
                    /> : null}
                </div>
            </React.Fragment>
        );
    }
}

export default home;
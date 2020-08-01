import React, { Component } from 'react'

class TestMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    myLayerGroup = 3
    componentDidMount = () => {
        this.myLayerGroup = 4
    }
    change = () => {
        console.log("TestMap -> componentDidMount -> this.myLayerGroup", this.myLayerGroup)
    }
    render() {
        this.change()
        return (
            <>

            </>
        )
    }
}

export default TestMap

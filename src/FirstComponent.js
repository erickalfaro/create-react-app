import React, {Component, useState} from 'react';
import axios from 'axios';
export default class FirstComponent extends Component {

constructor(props) {
    super(props)
    this.state = {
        lat: 0,
        lon: 0
    }
    }

componentDidMount() {
    this.getCustomerData();
    }

//Function to get the Customer Data from json
getCustomerData() {
    axios.get('https://api.wheretheiss.at/v1/satellites/25544').then(response => {
        this.setState({lat: response.data.latitude})
        this.setState({lon: response.data.longitude})
    })
};

render() {
    
    const element = (<div>data</div>)

    return (<div className="comptext">
    <h3>First Component</h3>
    <div>{this.state.lat}</div>
    <div>{this.state.lon}</div>
    <div>{element}</div>
    </div>)
    }
}
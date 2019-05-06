import React, {Component} from 'react';
import './App.css';
import {ForSaleItemsList} from './component/ForSaleItemsList'
import {RecordSaleItem} from './component/RecordSaleItem'
import {MyLocation} from './component/MyLocation'
import Login from './component/Login'


class App extends Component {

  constructor() {
    super()
    this.state = {

      forSaleRecords: []
    }

  }

  componentDidMount() {
    let url = 'http://localhost:8080/for-sale'
    fetch(url)
    .then(response => response.json())
    .then (records => {
      this.setState({
        forSaleRecords: records
      })
    })
  }

  render() {
    return (
      <div>
      <Login/>
      <RecordSaleItem/>
      <MyLocation/>
      <ForSaleItemsList records = {this.state.forSaleRecords}/>
      </div>

    )

  }
}

export default App;

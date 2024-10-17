import React, { Component } from 'react';
import "./App.css";
import ScatterPlot from './ScatterPlot';
import BarGraph from './BarGraph';
import * as d3 from 'd3';
import tips from './tips.csv';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    let self = this;

    d3.csv(tips, function(data){
      return{
        tip: parseFloat(data.tip),
        total_bill: parseFloat(data.total_bill),
        day: data.day
      }
    }).then(function(csvData){
      //console.log(csvData)
      self.setState({data: csvData})
    })
    .catch(function(error){
      console.log(error)
    })
  }

  render() {
    return (
      <div className='parent'>
        <div className='child1'><ScatterPlot data={this.state.data} /></div>
        <div className='child2'><BarGraph data={this.state.data} /></div>
      </div>
    )
  }
}

export default App;

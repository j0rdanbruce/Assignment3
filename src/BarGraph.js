import React, { Component } from 'react';
import * as d3 from 'd3';

class BarGraph extends Component {
  
  componentDidMount(){
    console.log(this.props.data)
  }
  componentDidUpdate(){
    var data = this.props.data
    console.log('bar graph component did update', data)

    //dimensions and margins of the graph
    var margin = { top: 30, right: 10, bottom: 40, left: 30 },
      w = 600 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

    var container = d3.select(".bargraph_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_bg")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var bargraph_data = d3.flatRollup(
      data,
      (v)=>d3.mean(v, (d)=>d.tip),
      (d)=>d.day
    )

    //Bargraph Title
    d3.select(".bargraph_svg").selectAll(".title").data([0]).join('text')
      .attr('class', '.title')
      .attr('x',( w/2) + margin.left + margin.right)
      .attr('y', margin.top)
      .attr("text-anchor", 'middle')
      .text("Average Tip by Day")
      .attr('font-weight', 'bold')

    //X axis
    var x_data = bargraph_data.map(item=>item[0])
    var x_scale = d3.scaleBand().domain(x_data).range([margin.left,w]).padding(0.2);

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
      .attr("transform", `translate(0,${h})`).call(d3.axisBottom(x_scale))
    //X Axsis Label
    d3.select('.bargraph_svg').selectAll(".x_axis_title").data([0]).join("text")
      .attr("class", ".x_axis_title")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${(w/2)+margin.left+margin.right}, ${h+margin.top+margin.bottom-5})`)
      .text("Day")
      .attr('font-weight', 'bold')

    //Y axis
    var y_data = bargraph_data.map(item=>item[1])
    var y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,margin.top])

    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
    .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));
    //Y Axis Label
    d3.select('.bargraph_svg').selectAll(".y_axis_title").data([0]).join("text")
      .attr("class", "y_axis_title")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${margin.left}, ${h/2}) rotate(${-90})`)
      .text("Average Tip")
      .attr('font-weight', 'bold')
    
    container.selectAll("rect")
      .data(bargraph_data)
      .join("rect")
      .attr("x", (d)=>x_scale(d[0]))
      .attr("y", (d)=>y_scale(d[1]))
      .attr('width', x_scale.bandwidth())
      .attr("height", (d)=> h - y_scale(d[1]))
      .attr("fill", '#69b3a2')

  }
  render() {
    return (
      <svg className='bargraph_svg'>
        <g className='g_bg'></g>
      </svg>
    )
  }
}

export default BarGraph;
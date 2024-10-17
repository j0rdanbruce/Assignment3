import React, { Component } from 'react';
import * as d3 from 'd3';

class ScatterPlot extends Component {

  componentDidMount(){
    console.log(this.props.data)
  }
  componentDidUpdate(){
    var data = this.props.data
    console.log('Scatter plot component did update', data)

    //dimensions and margins of the graph
    var margin = { top: 30, right: 10, bottom: 40, left: 30 },
      w = 600 - margin.left - margin.right,
      h = 350 - margin.top - margin.bottom;

    var container = d3.select(".scatterplot_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_sp")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    //Scatterplot Title
    d3.select(".scatterplot_svg").selectAll(".title").data([0]).join('text')
      .attr('class', '.title')
      .attr('x', w/2 + margin.left + margin.right)
      .attr('y', margin.top)
      .attr("text-anchor", 'middle')
      .text("Total Bill vs Tips")
      .attr('font-weight', 'bold')

    //add X axis
    var x_data = data.map(item=>item.total_bill)
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
    .attr("transform", `translate(0,${h})`).call(d3.axisBottom(x_scale));
    //X axis label
    d3.select('.scatterplot_svg').selectAll(".x_axis_title").data([0]).join("text")
      .attr("class", ".x_axis_title")
      .attr("transform", `translate(${w/2+margin.left+margin.right}, ${h+margin.top+margin.bottom})`)
      .attr("text-anchor", "middle")
      .text("Total Bill")
      .attr('font-weight', 'bold')

    //add y axis
    var y_data = data.map(item=>item.tip)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,margin.top]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));
    //Y axis label
    d3.select('.scatterplot_svg').append("text")
      .attr("class", "y_axis_title")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${margin.left},${h/2}) rotate(-90)`)
      .text("Tips")
      .attr('font-weight', 'bold')

    container.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function(d) {
        return x_scale(d.total_bill);
      })
      .attr("cy", function(d) {
        return y_scale(d.tip);
      })
      .attr("r",3)
      .style("fill", '#69b3a2');
  }
  render() {
    return (
      <svg className='scatterplot_svg'>
        <g className='g_sp'></g>
      </svg>
    )
  }
}

export default ScatterPlot;
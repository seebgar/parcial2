import React from "react";
import * as d3 from "d3";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      svgContainer: undefined
    };

    this.handleCanvas = this.handleCanvas.bind(this);
  }

  componentDidMount() {
    this.setState(
      _ => {
        return {
          data: this.props.data,
          svgContainer: d3
            .select("body")
            .append("svg")
            .attr("width", "1000px")
            .attr("height", "500px")
        };
      },
      _ => {
        this.handleCanvas();
      }
    );
  }

  handleCanvas() {
    const canvas = this.state.svgContainer;
    const data = this.state.data;

    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 100, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleLinear()
      .domain([0, 10000000])
      .range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    const bar = bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.views))
      .attr("height", d => iheight - y(d.views))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
      .classed("y--axis", true)
      .call(d3.axisLeft(y));
  }

  render() {
    return <div></div>;
  }
}

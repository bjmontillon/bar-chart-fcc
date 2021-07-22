import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import '../src/barchart.css'

const Barchart = () => {

    const d3Chart = useRef()

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
        .then(response => response.json())
        .then(data =>{
            
            //transform data
            const dataset = data.data
            console.clear();
            console.log(dataset[0][0])
            console.log(dataset[0][0].substr(0,4))
            let yearValue = []

            var minDate = dataset[0][0].substr(0,4);
                minDate = new Date(minDate);
                console.log(minDate);
            var maxDate = dataset[dataset.length-1][0].substr(0,4);
                maxDate = new Date(maxDate);
                console.log(maxDate);

            dataset.forEach(element => {
                yearValue.push(element[0])
            });
            

            const margin = { top: 30, right: 30, bottom: 30, left: 30};
            const width = parseInt(
                d3.select('#d3NewChart')
                  .style('width')
            )
            const height = parseInt(
                d3.select('#d3NewChart')
                  .style('height')
            )

            
            //setup chart
            const svg = d3.select(d3Chart.current)
                            .attr('width', width)
                            .attr('height', height)
                            .style('background-color', '#ccf5cc')
                            .append('g')
                            .attr('transform', 'translate('+ margin.left + ','+ margin.top +')');

                            svg.selectAll('bar')
                            .data(dataset)
                            .enter()
                            .append('rect')
                            .style('fill', "orangered")
                            .attr({
                                x: function(d, i) {
                                    return (i * (width/dataset.length));
                                },
                                width : (width / dataset.length)
                                
                            })
           
            // CONTINUE ADDING SCALES

            // REFERENCE ('https://www.youtube.com/watch?v=AhD-oziq53w')
            
            const xAxisScale = d3.scaleTime()
                        .domain([minDate, maxDate])
                        .range([0, width])

            const yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset, function(d) {
                            return d[1]
                        })
                    ])
                        .range([height, 0]);
            
            const xAxis = d3.axisBottom().scale(xAxisScale);
            const yAxis = d3.axisLeft().scale(yAxisScale);

            const toolTip = d3.select('body').append('div').style({
                'position': 'absolute',
                'padding': '4px',
                'background': '#fff',
                'border' : '1px solid #000',
                'color': '#000'
            });

            // const svg = d3.select('d3NewChart')
            //                 .append('svg')
            //                 .attr('width', width + margin.left + margin.right)
            //                 .atrr('height', height + margin.top + margin.bottom)




        });
    });

    return (
        <div id='d3NewChart'>
            <svg ref={d3Chart}></svg>
        </div>
    );
}

export default Barchart

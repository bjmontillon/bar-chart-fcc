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
            console.log(dataset);

            const margin = { top: 30, right: 30, bottom: 30, left: 30};
            const width = parseInt(d3.select('#d3NewChart').style('width'))
            const height = parseInt(d3.select('#d3NewChart').style('height'))

            //setup chart
            const svg = d3.select(d3Chart.current)
                            .attr('width', width)
                            .attr('height', height)
                            .style('background-color', '#ccf5cc')
                            .append('g')
                                .attr('transform', 'translate('+ margin.left + ','+ margin.top +')')

           


        });
    });

    return (
        <div id='d3NewChart'>
            <svg ref={d3Chart}></svg>
        </div>
    );
}

export default Barchart

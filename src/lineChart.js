import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState, Component } from "react";
import * as d3 from "d3";

function LineChart({ width, height,data, inputVar }) {
    console.log(data)
    const ref = useRef();
    useEffect(() => { //replace DOM contents with useEffect

        const dotPlot = 

        Plot.plot({
            style: {
               backgroundColor: "#023555",
             color: "#fafafa",
            },
            y:{ label: "Air Temperature",
         
               domain: [d3.min(data, d => d.value) <0 ? d3.min(data, d => d.value) : 0, d3.max(data, d => d.value)+2]},
            x:{ label: null},
           marks: [
            //    Plot.dot(scrubberDataTa, {x: "rawdate", y:  "value",stroke: "white",fill: "currentColor",dy:-2}),
            //      Plot.ruleX([iii], {
            //      // stroke: "white",
            //      y1: 0,
            //      y2: d3.max(dataToPlotTa, (d) => d.value)+1
            //    }),
            //  Plot.text(scrubberDataTa, {x: "rawdate", y: d3.max(dataToPlotTa, (d) => d.value)+1 ,text: d => (d.value).toFixed(1) + "°C",fontSize: 12,dy:-5}),
             Plot.line(data, {
               x: "datetime",
               y: "value",
               stroke: "#fafafa",
               strokeWidth: 4,
               curve: "linear"
             }),
            //  Plot.axisX({x: (y) =>""
            // }),
           ],
         
         
         });
                 ref.current.append(dotPlot);
        return () => dotPlot.remove();
    }, [data]);   
    

    return (
        <div>
            <div ref={ref}></div>
        </div>
    );

}

export default LineChart;
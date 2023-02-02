import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState, Component } from "react";


function LineChart({ width, height,data, inputVar, unit }) {
    const ref = useRef();
    useEffect(() => { //replace DOM contents with useEffect

        const dotPlot = Plot.dot(
            data,
            {
                x: "time",
                y: "variable",
                fill: 'steelblue',
                fillOpacity: 0.5,
       
            }
        ).plot({
            width:width,
            height:height,
            marginTop: 50,
            marginLeft: 50,

            y:{
                label: inputVar + " " + unit
            }
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
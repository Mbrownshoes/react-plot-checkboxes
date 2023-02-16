import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState, Component } from "react";


function LineChart({ width, height,data, inputVar }) {
    console.log(inputVar)
    const ref = useRef();
    useEffect(() => { //replace DOM contents with useEffect

        const dotPlot = Plot.dot(
            data,
            {
                x: "datetime",
                y: "value",
                fill: 'steelblue',
                fillOpacity: 0.5,
       
            }
        ).plot({
            width:width,
            height:height,
            marginTop: 50,
            marginLeft: 50,

            y:{
                label: inputVar.variable
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
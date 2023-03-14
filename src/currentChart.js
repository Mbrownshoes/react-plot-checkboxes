import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState, Component } from "react";
import * as d3 from "d3";

function CurrentChart({ width, height, data, playLine, inputVar }) {
    const scrubberData = data.filter(d => +d.datetime === playLine)
    const playDate = Array.isArray(playLine) ? [] : new Date(playLine)
    const playLineString = Array.isArray(playDate) ? [] : playDate.getFullYear() + "" + ('0' + (playDate.getMonth() + 1)).slice(-2) + "" + ('0' + (playDate.getDate() )).slice(-2)+ "_" +  ('0' + (playDate.getHours())).slice(-2)
    console.log(inputVar,scrubberData)
    const ref = useRef();
    useEffect(() => { //replace DOM contents with useEffect
        const dotPlot =
            Plot.plot({
                style: {
                    backgroundColor: "#023555",
                    color: "#fafafa"
                },
                y: {
                    grid: false
                    // nice:true
                },
                x: { label: null },
                marks: [
                    Plot.dot(scrubberData, {
                        x: "rawdate",
                        y: "speed",
                        stroke: "white",
                        fill: "currentColor",
                        // dy: -2
                    }),
                    Plot.ruleX([playLineString], {
                        stroke: "white",
                        y1: 0,
                        y2: d3.max(data, (d) => d.speed) + .1
                    }),
                    Plot.text(scrubberData, {
                        x: "rawdate",
                        y: d3.max(data, (d) => d.speed) + .1,
                        text: (d) => d.speed.toFixed(1) + " km/h",
                        fontSize: 12,
                        dy: -5
                    }),

                    Plot.barY(data, { x: "rawdate", y: "speed" }),
                    Plot.vector(data, {
                        x: "rawdate",
                        y: -0.15,
                        rotate: "direction",
                        length: 10,
                        stroke: "white"
                        // dx:15
                    }),

                    Plot.text(data, {
                        x: "rawdate",
                        y: -0.08,
                        text: (d) => d.speed.toFixed(1),
                        fontSize: 12
                    }),
                    // Plot.text(data, { x: "rawdate", y: -1.1, text: "gust", fontSize: 8 }),

                    Plot.axisX({ x: (y) => "" })
                ],


            });
        ref.current.append(dotPlot);
        return () => dotPlot.remove();
    }, [data,playLine]);


    return (
        <div>
            <div ref={ref}></div>
        </div>
    );

}

export default CurrentChart;
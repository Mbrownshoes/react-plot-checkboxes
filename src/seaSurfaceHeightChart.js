import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState, Component } from "react";
import * as d3 from "d3";

function TideChart({ width, height, data,sunData, playLine, inputVar }) {
  const scrubberData = data.filter(d => +d.utcdatetime === playLine)
  const playDate = Array.isArray(playLine) ? [] : new Date(playLine)
  const playLineString = Array.isArray(playDate) ? [] : playDate.getFullYear() + "" + ('0' + (playDate.getMonth() + 1)).slice(-2) + "" + ('0' + (playDate.getDate())).slice(-2) + "_" + ('0' + (playDate.getHours())).slice(-2)
  console.log(data,sunData, playLine, scrubberData);

  const ref = useRef();
  useEffect(() => {

    const dotPlot =

      Plot.plot({
        style: {
          backgroundColor: "#023555",
          color: "#fafafa"
        },
        y: {
          label: "Sea surface height",
          domain: [
            d3.min(data, (d) => d.value) < 0
              ? d3.min(data, (d) => d.value)
              : 0,
            d3.max(data, (d) => d.value)
          ]
        },
        x: { label: null, padding: 0 },
        marks: [
          Plot.barY(sunData, {
            // filter: (d) => d.isDay === 2,
            x: "datetime",
            y1: -2,
            y2: 2,
            fillOpacity: 0.9,
            fill: (d) => {
              console.log(d);
              return d.date > d.sunrise && d.date < d.sunset
                ? "#ffffdd"
                // : (d.date > d.localDawn && d.date < d.localSunrise) ||
                //   (d.date > d.localSunset && d.date < d.localDusk)
                //   ? "#abd9e9"
                  : "#023555"
            },
            insetLeft: 0,
            insetRight: 0
          }),
          Plot.dot(data, {
            x: "datetime",
            y: "value",
            stroke: "white",
            fill: "currentColor",
            dy: -2
          }),
          Plot.ruleX([playLineString], {
            stroke: "white",
            y1: 0,
            y2: d3.max(data, (d) => d.value)
          }),
          Plot.text(scrubberData, {
            x: "datetime",
            y: d3.max(data, (d) => d.value),
            text: (d) => d.value,
            fontSize: 12,
            dy: -5
          }),
          // Plot.text(data, {
          //   x: "rawdate",
          //   y: d3.max(data, (d) => d.value),
          //   text: (d) => d.value.toFixed(1) + "m",
          //   fontSize: 12,
          //   dy: -10
          // }),

          Plot.line(data, {
            x: "datetime",
            y: "value",
            stroke: "#fafafa",
            strokeWidth: 4,
            curve: "catmull-rom"
          }),
          Plot.axisX({ x: (y) => "" })
        ]
      })
    ref.current.append(dotPlot);
    return () => dotPlot.remove();
  }, [data, playLine]);


  return (
    <div>
      <div ref={ref}></div>
    </div>
  );

}

export default TideChart;
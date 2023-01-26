import { useRef, useEffect, useState, Component } from "react";
import * as Plot from "@observablehq/plot";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { Checkboxes } from "./checkboxes";



function MyPlot({ data }) {
    const allVars = ["ucur", "vcur", "uwnd", "vwnd", "hs", "lm", "t02", "fp", "dir", "dp", "wcc", "wch", "utwo", "vtwo", "foc", "uuss", "ß"]

    const ref = useRef(); // create DOM node to chart
    const [selectedVars, setSelectedVars] = useState(allVars);


    const onCheckChange = (changedIndex) => {
    const newSelectedVars = selectedVars.map((value, i) =>
        i === changedIndex ? (selectedVars[i] ? false : allVars[i]) : value
    );
    setSelectedVars(newSelectedVars);
    };


    const [optionValue, setOptionValue] = useState("wch");
    const handleSelect = (e) => {
        console.log(e)
        console.log(e.value);
        setOptionValue(e.value);
    };

    useEffect(() => { //replace DOM contents with useEffect

        const dotPlot = Plot.dot(
            data.filter((d) => selectedVars.includes(d.wch)),
            {
                x: "time",
                y: optionValue,
                fill: 'steelblue',
                fillOpacity: 0.5,
                title: (d) =>
                    [d.path, `${d.duration} ms`, `status ${d.status_code}`].join("\n")
            }
        ).plot({
            marginTop: 50,
            marginLeft: 50
        });
        ref.current.append(dotPlot);
        return () => dotPlot.remove();
    }, [data, optionValue]);

    return (
        <div>
          <Checkboxes
            title="Status code"
            onChange={onCheckChange}
            options={allVars}
          />
          <div ref={ref}></div>
        </div>
      );
}


export default MyPlot;
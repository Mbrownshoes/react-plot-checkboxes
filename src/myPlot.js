import { useRef, useEffect, useState, Component } from "react";
import * as Plot from "@observablehq/plot";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';



function MyPlot({ data }) {
    const allVars = ["ucur", "vcur", "uwnd", "vwnd", "hs", "lm", "t02", "fp", "dir", "dp", "wcc", "wch", "utwo", "vtwo", "foc", "uuss", "ß"]

    const ref = useRef(); // create DOM node to chart

    const [optionValue, setOptionValue] = useState("wch");
    const handleSelect = (e) => {
        console.log(e)
        console.log(e.value);
        setOptionValue(e.value);
    };

    useEffect(() => { //replace DOM contents with useEffect

        const dotPlot = Plot.dot(
            data,//.filter((d) => selectedCodes.includes(d.status_code)),
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
            <Dropdown
                placeholder="Select an option"
                className="my-className"
                options={allVars}
                value="wch"
                onChange={(value) => handleSelect(value)}
                onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                onOpen={() => console.log('open!')}
            />

            <div ref={ref}></div>
        </div>
    );
}


export default MyPlot;
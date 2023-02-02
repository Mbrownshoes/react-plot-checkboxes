import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { CheckboxLabels } from "./checkboxes";
import LineChart from "./lineChart.js"

let ticker = 0

function MyPlot({ data }) {
    // console.log(data)
    const allVars = ["ucur", "vcur", "uwnd", "vwnd", "hs", "lm", "t02", "fp", "dir", "dp", "wcc", "wch", "utwo", "vtwo", "foc", "uuss", "vuss"]
    const units = ["eastward current, m s-1", "northward current, m s-1", "Eastward Wind,m s-1", "Northward Wind,m s-1", "significant height of wind waves,m", "mean wave length,m", "mean period T02,s", "wave peak frequency, s-1", "wave mean direction, degree", "peak direction, degree", "whitecap coverage, 1", "significant breaking wave height, m", "eastward wave to ocean stress, m2 s-2", "northward wave to ocean stress, m2 s-2", "wave to ocean energy flux, W m-2", "eastward surface stokes drift, m s-1", "northward surface stokes drift, m s-1"]
    // const ref = useRef(); // create DOM node to chart
    const [selectedVars, setSelectedVars] = useState(allVars);


    const onCheckChange = (changedIndex) => {

        console.log(changedIndex, ticker)
        const newSelectedVars = selectedVars.map((value, i) =>
            i === changedIndex ? (selectedVars[i] ? false : allVars[i]) : value
        );

        if (ticker === 0) {
            newSelectedVars[0] = false

        }
        ticker += 1
        console.log(newSelectedVars)
        setSelectedVars(newSelectedVars);
    };


    useEffect(() => { //replace DOM contents with useEffect

        if (ticker === 0) { selectedVars[0] = false }
        console.log(selectedVars, ticker)


        console.log(selectedVars)
    }, [data, selectedVars]);

    return (
        <div>
            <CheckboxLabels
                options={allVars}
                onChange={onCheckChange}
                units={units}
            />
            {selectedVars.map((items, i) =>
            (selectedVars[i] !== allVars[i] ? <LineChart width={600} height={400} data={data.map(d => {
                // console.log(units[i])
                return { time: d.time, variable: d[allVars[i]] }
            })} inputVar={allVars[i]}
                unit={units[i]} /> : "")
            )}


        </div>
    );
}


export default MyPlot;
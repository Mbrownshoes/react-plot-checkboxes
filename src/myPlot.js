import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
// import Slider from "./slider.js"
import * as d3 from "d3";

// let ticker = 0

function MyPlot({field }) {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const offset = new Date().getTimezoneOffset();
  
      d3.csv("/ubcSSf2DWaveFields30m.csv", d3.autoType).then(dataRaw => {
        return dataRaw.map(d => {
          d.date = new Date(d.time.getTime() - offset*60*1000)
        return d})
  
      }).then(dataout => {
        console.log(dataout)
        setData(dataout);
        setLoading(false);
      });
    }, []);


    

    const allVars = ["potentialTemperature", "salinity", "seaSurfaceHeight", "airTemperature", "current", "wind"]
    const units = ["°C", "stuff","m", "°C", "m-2 s-1", "m-2 s-1"]
    // const ref = useRef(); // create DOM node to chart
    const [selectedVar, setSelectedVar] = useState(allVars);
    const [selectedUnit, setSelectedUnit] = useState(allVars);


    const onCheckChange = (changedIndex) => {

        console.log(allVars[changedIndex])
        // const newSelectedVars = selectedVars.map((value, i) =>
        //     i === changedIndex ? (selectedVars[i] ? false : allVars[i]) : value
        // );

        // if (ticker === 0) {
        //     newSelectedVars[0] = false

        // }
        // ticker += 1
        setSelectedVar(allVars[changedIndex]);
        setSelectedUnit(units[changedIndex]);
    };


    useEffect(() => { //replace DOM contents with useEffect


    }, [data, selectedVar]);

    return (
        <div>
            <RadioButtonsGroup
                options={allVars}
                onChange={onCheckChange}
                units={units}
            />
            {/* <Slider/> */}
            (
            <LineChart width={600} height={400} data={data.map(d => {
                return { time: d.time, variable: selectedVar }
            })} inputVar={selectedVar}
                unit={selectedUnit} /> )
            {/* )} */}


        </div>
    );
}


export default MyPlot;
import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
// import Slider from "./slider.js"
import * as d3 from "d3";
import axios from 'axios';

// let ticker = 0

function MyPlot({ field }) {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const offset = new Date().getTimezoneOffset();

        //   d3.csv("/ubcSSf2DWaveFields30m.csv", d3.autoType).then(dataRaw => {
        //     return dataRaw.map(d => {
        //       d.date = new Date(d.time.getTime() - offset*60*1000)
        //     return d})

        //   }).then(dataout => {
        //     console.log(dataout)
        //     setData(dataout);
        //     setLoading(false);
        //   });

        axios.post(
            'https://process.oceangns.com/SSVfieldValueTimeseries', {
            field: field,
            model: "HRDPS",
            dateTime1: "20230108_12",
            dateTime2: "20230109_15",
            level: 1015,
            lon: -124.0555,
            lat: 48.414
        }).then(response => {
            console.log(response.data)

            setData(response.data);
            setLoading(false);
        });
    }, []);


    const allVars = ["potentialTemperature", "salinity", "seaSurfaceHeight", "airTemperature", "current", "wind"]
    const units = ["°C", "stuff", "m", "°C", "m-2 s-1", "m-2 s-1"]
    // const ref = useRef(); // create DOM node to chart
    const [selectedVar, setSelectedVar] = useState(allVars);
    const [selectedUnit, setSelectedUnit] = useState(allVars);


    const onCheckChange = (changedIndex) => {

        console.log(allVars[changedIndex])

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
            {/* (
            <LineChart width={600} height={400} data={data} inputVar={selectedVar}
                unit={selectedUnit} /> ) */}
            {/* )} */}


        </div>
    );
}


export default MyPlot;
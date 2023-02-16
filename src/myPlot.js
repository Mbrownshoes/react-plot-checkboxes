import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
// import Slider from "./slider.js"
import * as d3 from "d3";
import axios from 'axios';


function MyPlot() {


    const allVars = [{ "variable": "potentialTemperature", "model": "CIOPS", "level": 0.5 }, { "variable": "salinity", "model": "CIOPS", "level": 0.5 }, { "variable": "seaSurfaceHeight", "model": "CIOPS", "level": "null" }, { "variable": "airTemperature", "model": "HRDPS", "level": "1015" }, { "variable": "current", "model": "CIOPS", "level": "0.5" }, { "variable": "wind", "model": "salishSeaCast", "level": "null" }]
    // const units = ["°C", "stuff", "m", "°C", "m-2 s-1", "m-2 s-1"]

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVar, setSelectedVar] = useState(allVars[3]);
    // const [selectedUnit, setSelectedUnit] = useState(allVars);
    const parseTime = d3.timeParse("%Y%m%d_%H")

    useEffect(() => {
        console.log(selectedVar)
        // const offset = new Date().getTimezoneOffset();


        axios.post(
            'https://process.oceangns.com/SSVfieldValueTimeseries', {
            field: selectedVar.variable,
            model: selectedVar.model,
            dateTime1: "20230216_12",
            dateTime2: "20230217_15",
            level: selectedVar.level,
            lon: -124.0555,
            lat: 48.414
        }).then(response => {
            console.log(response)
            const corrected = response.data.map(d =>{
                d = d3.autoType(d)
                d.datetime = parseTime(d.datetime)
                return d
            })
            console.log(corrected)
            setData(corrected);
            setLoading(false);
        });
    }, [selectedVar]);


    const onCheckChange = (changedIndex) => {

        console.log(allVars[changedIndex])

        setSelectedVar(allVars[changedIndex]);
        // setSelectedUnit(units[changedIndex]);
    };

    // useEffect(() => { //replace DOM contents with useEffect
    //     console.log(selectedVar)
    // }, [data]);

    return (
        <div>
            <RadioButtonsGroup
                options={allVars}
                onChange={onCheckChange}
         
            />
            <LineChart width={600} height={400} data={data} inputVar={selectedVar}
               />
            {/* <Slider/> */}



        </div>
    );
}


export default MyPlot;
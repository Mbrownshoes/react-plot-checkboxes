import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
import Slider from "./slider.js"
import * as d3 from "d3";
import axios from 'axios';


function MyPlot() {


    const allVars = [{ "variable": "potentialTemperature", "model": "CIOPS", "level": 0.5 }, { "variable": "salinity", "model": "CIOPS", "level": 0.5 }, { "variable": "seaSurfaceHeight", "model": "CIOPS", "level": "null" }, { "variable": "airTemperature", "model": "HRDPS", "level": "1015" }, { "variable": "current", "model": "CIOPS", "level": "0.5" }, { "variable": "wind", "model": "salishSeaCast", "level": "null" }]

    const [data, setData] = useState([]);
    const [dataPlot, setDataPlot] = useState([]);

    const [loading, setLoading] = useState(true);
    const [selectedVar, setSelectedVar] = useState(allVars[3]);
    // const [selectedUnit, setSelectedUnit] = useState(allVars);
    const parseTime = d3.timeParse("%Y%m%d_%H")
    const startTimeFrame = new Date()
    const endTimeFrame = new Date()
    startTimeFrame.setDate(startTimeFrame.getDate() - 2);
    endTimeFrame.setDate(endTimeFrame.getDate() + 2);
    console.log(startTimeFrame)
    const dateStartString = startTimeFrame.getUTCFullYear() + "" + ('0' + (endTimeFrame.getUTCMonth() + 1)).slice(-2)+ "" + startTimeFrame.getUTCDate() + "_" + startTimeFrame.getHours();

    const dateEndString = endTimeFrame.getUTCFullYear() + "" + ('0' + (endTimeFrame.getUTCMonth() + 1)).slice(-2)+ "" + endTimeFrame.getUTCDate() + "_" + endTimeFrame.getHours();
    console.log(dateEndString)

    const [value, setValue] = useState([+startTimeFrame, +endTimeFrame]);


    useEffect(() => {

        axios.post(
            'https://process.oceangns.com/SSVfieldValueTimeseries', {
            field: selectedVar.variable,
            model: selectedVar.model,
            dateTime1: dateStartString, //20231114_12
            dateTime2: dateEndString,
            level: selectedVar.level,
            lon: -124.0555,
            lat: 48.414
        }).then(response => {
            const corrected = response.data.map(d => {
                d = d3.autoType(d)
                d.datetime = parseTime(d.datetime)
                return d
            })
            setData(corrected);
            setDataPlot(corrected);
            setLoading(false);
        });
    }, [selectedVar]);


    const onCheckChange = (changedIndex) => {

        // console.log(allVars[changedIndex])

        setSelectedVar(allVars[changedIndex]);
        // setSelectedUnit(units[changedIndex]);
    };



    const onSliderChange = (_, v) => {
        // console.log(data.filter(d => +d.datetime > v[0] && +d.datetime < v[1]))
        setValue(v)
        setDataPlot(data.filter(d => +d.datetime > v[0] && +d.datetime < v[1]))
    };

    return (
        <div>
            <RadioButtonsGroup
                options={allVars}
                onChange={onCheckChange}

            />

            <Slider
                value={value}
                startTime={startTimeFrame}
                endTime={endTimeFrame}
                onChange={onSliderChange} />
            <LineChart width={600} height={400} data={dataPlot} inputVar={selectedVar}
            />



        </div>
    );
}


export default MyPlot;
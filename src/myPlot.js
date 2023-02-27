import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
import WindChart from "./windChart.js"
import Slider from "./slider.js"
import * as d3 from "d3";
import axios from 'axios';


function MyPlot() {

    const offset = new Date().getTimezoneOffset();


    const allVars = [{ "variable": "potentialTemperature", "model": "CIOPS", "level": 0.5 }, { "variable": "salinity", "model": "CIOPS", "level": 0.5 }, { "variable": "seaSurfaceHeight", "model": "CIOPS", "level": "null" }, { "variable": "airTemperature", "model": "HRDPS", "level": "1015" }, { "variable": "current", "model": "CIOPS", "level": "0.5" }, { "variable": "wind", "model": "salishSeaCast", "level": "null" }]

    const [data, setData] = useState([]);
    const [dataPlot, setDataPlot] = useState([]);

    const [loading, setLoading] = useState(true);
    const [selectedVar, setSelectedVar] = useState(allVars[3]);

    const parseTime = d3.timeParse("%Y%m%d_%H")

    const startTimeFrame = new Date()
    const endTimeFrame = new Date()
    startTimeFrame.setDate(startTimeFrame.getDate() - 1);
    endTimeFrame.setDate(endTimeFrame.getDate() +1);
    const dateStartString = startTimeFrame.getFullYear() + "" + ('0' + (endTimeFrame.getMonth() + 1)).slice(-2) + "" + startTimeFrame.getDate() + "_" + startTimeFrame.getHours();

    const dateEndString = endTimeFrame.getFullYear() + "" + ('0' + (endTimeFrame.getMonth() + 1)).slice(-2) + "" + endTimeFrame.getDate() + "_" + endTimeFrame.getHours();

    const [value, setValue] = useState([+startTimeFrame, +endTimeFrame]);


    useEffect(() => {

        axios.post(
            'https://process.oceangns.com/SSVfieldValueTimeseries', {
            field: selectedVar.variable,
            model: selectedVar.model,
            dateTime1: dateStartString,
            dateTime2: dateEndString,
            level: selectedVar.level,
            lon: -124.118013,
            lat: 48.404038
        }).then(response => {
            console.log(response.data)
            const corrected = response.data.map(d => {

                if (d.value) { d.value = Number(d.value) }
                d.rawdate = d.datetime
                d.datetime = parseTime(d.datetime)
                d.date = new Date((d.datetime).getTime() - offset * 60 * 1000)

                return d
            })
            setData(corrected);
            setDataPlot(corrected);
            setLoading(false);
        });
    }, [selectedVar]);


    const onCheckChange = (changedIndex) => {

        setSelectedVar(allVars[changedIndex]);
    };



    const onSliderChange = (_, v) => {
        setValue(v)
        setDataPlot(data.filter(d => +d.datetime >= v[0] && +d.datetime <= v[1]))
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


            {selectedVar.variable === "airTemperature" ?
                < LineChart width={600} height={400} data={dataPlot} inputVar={selectedVar} /> : selectedVar.variable === "wind" ? < LineChart width={600} height={400} data={dataPlot} inputVar={selectedVar} /> : ""
            }

        </div>
    );
}


export default MyPlot;
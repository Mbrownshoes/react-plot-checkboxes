import { useRef, useEffect, useState, Component } from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { RadioButtonsGroup } from "./radiobutts";
import LineChart from "./lineChart.js"
import WindChart from "./windChart.js"
import CurrentChart from "./currentChart.js"
import TideChart from "./seaSurfaceHeightChart"

import Box from '@mui/material/Box';
import TimeSlider from "./slider.js"
import * as d3 from "d3";
import axios from 'axios';
import * as suncalc from "suncalc";



function MyPlot() {

    const offset = new Date().getTimezoneOffset();

    const allVars = [{ "variable": "potentialTemperature", "model": "CIOPS", "level": 0.5 }, { "variable": "salinity", "model": "CIOPS", "level": 0.5 }, { "variable": "seaSurfaceHeight", "model": "CIOPS", "level": "null" }, { "variable": "airTemperature", "model": "HRDPS", "level": "null" }, { "variable": "current", "model": "CIOPS", "level": "0.5" }, { "variable": "wind", "model": "HRDPS", "level": "null" }]

    const [data, setData] = useState([]);
    const [sunData, setSunData] = useState([]);


    const [loading, setLoading] = useState(true);
    const [selectedVar, setSelectedVar] = useState(allVars[3]);

    const parseTime = d3.utcParse("%Y%m%d_%H")
    const parseTime1 = d3.utcParse("%Y%m%d%H")


    const [dateValues, setDateValues] = useState([]);
    const [sliderValue, setSliderValue] = useState([]);
    const [apiDateStrings, setapiDateStrings] = useState([]);
    const [nowRuler, setNowRuler] = useState([]);

    const formatTimes = (date) => {
        const { sunrise, sunset } = suncalc.getTimes(
            date,
            48.404038, -124.118013
        );

        const toHours = (d) =>
            d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;

        return {
            date,
            datetime: date.getFullYear() + "" + ('0' + (date.getUTCMonth() + 1)).slice(-2) + "" + ('0' + (date.getUTCDate())).slice(-2) + "_" + ('0' + (date.getUTCHours())).slice(-2),
            sunrise: (sunrise),
            sunset: (sunset)
        };
    }

    function getTideData({ completeDataset }) {
        console.log(completeDataset);
        // const alluniqdays = [...new Set(completeDataset.map(d => { return d.date }))]
        // const days = alluniqdays.map(d => parseTime1(d + 12))

        const times = completeDataset
            .map(d => ({
                day: d.date,
                value: d.value,
                datetime: d.datetime,
                sun: suncalc.getTimes(d.date, 48.404038, -124.118013)
            }))
            .map(({ day, sun, value, datetime }) => {
                return {
                    ...sun,
                    day,
                    value,
                    datetime,
                    localSunrise: new Date(sun.sunrise.getTime()),
                    localSunset: new Date(sun.sunset.getTime()),
                    localDawn: new Date(sun.dawn.getTime()),
                    localDusk: new Date(sun.dusk.getTime()),

                };
            })

        return times
    }

    function loadData({ apiDateStrings, selectedVar }) {

        axios.post(
            'https://process.oceangns.com/SSVfieldValueTimeseries', {
            field: selectedVar.variable,
            model: selectedVar.model,
            dateTime1: apiDateStrings[0].getFullYear() + "" + ('0' + (apiDateStrings[0].getUTCMonth() + 1)).slice(-2) + "" + ('0' + (apiDateStrings[0].getUTCDate())).slice(-2) + "_" + ('0' + (apiDateStrings[0].getUTCHours())).slice(-2),
            dateTime2: apiDateStrings[1].getFullYear() + "" + ('0' + (apiDateStrings[1].getUTCMonth() + 1)).slice(-2) + "" + ('0' + (apiDateStrings[1].getUTCDate())).slice(-2) + "_" + ('0' + (apiDateStrings[1].getUTCHours())).slice(-2),
            level: selectedVar.level,
            lon: -124.118013,
            lat: 48.404038
        }).then(response => {

            const corrected = response.data.map(d => {

                if (selectedVar.variable === "wind" || selectedVar.variable === "curent") {
                    d.speed = Number(d.speed)
                    d.direction = Number(d.direction) * 180 / 3.1415
                } else {
                    d.value = Number(d.value)
                }


                d.date = parseTime(d.datetime)

                //d.date = d.utcdatetime //new Date((d.utcdatetime).getTime() - (offset * 60 * 1000))
                // d.rawdate = d.utcdatetime.getFullYear() + "" + ('0' + (d.utcdatetime.getMonth() + 1)).slice(-2) + "" + ('0' + (d.utcdatetime.getDate() )).slice(-2)+ "_" +  ('0' + (d.utcdatetime.getHours())).slice(-2)

                return d
            })

            const dateRange = d3.utcHour.range(new Date(dateValues[0]), new Date(dateValues[1]))
            // fill in dates with no data
            const completeDataset = dateRange.map(d => {
                let matched = corrected.find(f => +f.date === +d)
                return matched === undefined ? { date: d, datetime: d.getFullYear() + "" + ('0' + (d.getUTCMonth() + 1)).slice(-2) + "" + ('0' + (d.getUTCDate())).slice(-2) + "_" + ('0' + (d.getUTCHours())).slice(-2) } : matched

            })

            console.log(completeDataset);

            if (selectedVar.variable === "seaSurfaceHeight") {
                console.log(completeDataset);

                const sunny = d3.timeDay
                    .range(dateValues[0], dateValues[1])
                    .map(formatTimes)

                    setSunData(sunny);

                const tideData = completeDataset //getTideData({ completeDataset })
                console.log(tideData);

                setData(tideData);
            } else {
                setData(completeDataset);
            }

            setLoading(false);
        });

    }


    // Get the most current API dates available
    useEffect(() => {
        axios.post(
            'https://process.oceangns.com/SSVavailDateTimes', {
            field: selectedVar.variable
        }).then(response => {

            const alldates = response.data.dateTimes

            const lastdate = parseTime(alldates[alldates.length - 1])
            const firstdate = parseTime(alldates[alldates.length - (72)])

            //use utc dates to load data
            setapiDateStrings([firstdate, lastdate])
            // use local time
            console.log([firstdate, lastdate]);
            setDateValues([+firstdate, +lastdate])
            setSliderValue(+firstdate)

        })
    }, []);

    //Load the data
    useEffect(() => {
        //Only run if there are dates loaded
        console.log(apiDateStrings)
        if (apiDateStrings, apiDateStrings.length !== 0) {
            loadData({ apiDateStrings, selectedVar })
        }
    }, [selectedVar, apiDateStrings]);


    const onCheckChange = (changedIndex) => {
        setData([]) //wipe previous data until the new data loads
        setSelectedVar(allVars[changedIndex]);
    };



    const onSliderChange = (_, v) => {
        setNowRuler(v)
        setSliderValue(v)
    };

    return (

        <div style={{ width: '100%', margin: "20px" }}>
            <RadioButtonsGroup
                options={allVars}
                onChange={onCheckChange}
            />

            <TimeSlider
                value={sliderValue}
                startTime={dateValues[0]}
                endTime={dateValues[1]}
                onChange={onSliderChange} />


            {selectedVar.variable === "airTemperature" || selectedVar.variable === "potentialTemperature" ?
                < LineChart width={600} height={400} data={data} playLine={nowRuler} inputVar={selectedVar} />
                : selectedVar.variable === "wind" ?
                    < WindChart width={600} height={400} data={data} playLine={nowRuler} inputVar={selectedVar} /> :
                    selectedVar.variable === "current" ? < CurrentChart width={600} height={400} data={data} playLine={nowRuler} inputVar={selectedVar} /> :
                        selectedVar.variable === "seaSurfaceHeight" ? < TideChart width={600} height={400} data={data} sunData = {sunData} playLine={nowRuler} inputVar={selectedVar} /> : ""
            }

        </div>
    );
}


export default MyPlot;
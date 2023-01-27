import "./styles.css";
import MyPlot from "./myPlot"
import * as d3 from "d3";

import { useRef, useEffect, useState } from "react";


function App() {
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

  return (
    <div className="App">
      <h1>Plot in React (with input!)</h1>
      {loading && <div>loading</div>}
      {!loading && <MyPlot
        data={data}
      />}
    </div>
  );
}

export default App;

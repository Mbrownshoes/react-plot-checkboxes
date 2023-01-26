import "./styles.css";
import MyPlot from "./myPlot"
import * as d3 from "d3";

import { useRef, useEffect, useState } from "react";


function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.csv("/ubcSSf2DWaveFields30m.csv", d3.autoType).then(d => {
      setData(d);
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

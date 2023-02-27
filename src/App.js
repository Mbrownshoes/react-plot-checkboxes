import "./styles.css";
import MyPlot from "./myPlot"
import { useRef, useEffect, useState } from "react";


function App() {


  return (
    <div className="App">
      <h1>plot ss data</h1>
      {/* {loading && <div>loading</div>} */}
      {<MyPlot
      />}
    </div>
  );
}

export default App;


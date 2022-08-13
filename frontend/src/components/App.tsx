import React, { useEffect } from "react";
import "./App.css";

const url = "http:localhost:8000";
function App() {
  useEffect(() => {
    fetch(url)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <p>data</p>
    </div>
  );
}

export default App;

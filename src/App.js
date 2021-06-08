import React, { Component } from "react";
import Carousel from "./components/Carousel";

class App extends Component {
  render() {
    return (
      <div>
        <Carousel imgs={[
          "../src/img/1.jpg",
          "../src/img/2.jpg",
          "../src/img/3.jpg",
          "../src/img/4.jpg",
          "../src/img/5.jpg",
        ]} />
      </div>
    );
  }
}

export default App;

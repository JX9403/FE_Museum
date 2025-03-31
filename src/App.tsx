import React from "react";
import "./App.css";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import HomePage from "./layouts/homepage/HomePage";

function App() {
  return (
    <div className="App ">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;

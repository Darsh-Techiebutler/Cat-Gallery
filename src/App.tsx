import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CatProvider } from "./context/CatContext";
import Gallery from "./components/Gallery";
import CatDetails from "./components/CatDetails";

const App: React.FC = () => {
  return (
    <CatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/cat/:catId" element={<CatDetails />} />
        </Routes>
      </Router>
    </CatProvider>
  );
};

export default App;

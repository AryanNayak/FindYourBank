import "./App.css";
import Navbar from "./components/Nav";
import { useState, useEffect } from "react";
import AllBanks from "./components/AllBanks";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Detail from "./components/Detail";
import InitialPage from "./components/InitialPage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/all-banks" element={<AllBanks />}></Route>
          <Route
            exact
            path="/bank-details/:bank_id"
            element={<Detail />}
          ></Route>
          <Route exact path="/" element={<InitialPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import about1 from "./bank.png";
import { NavLink, Link } from "react-router-dom";
import "./styles.css";

const InitialPage = () => {
  return (
    <div>
      <div id="about">
        <div className="about-image">
          <img src={about1} alt="" />
        </div>
        <div className="about-text">
          <h2>Find Your bank</h2>
          <p className="details">
            <span>Using</span> IFSC Code, Branch Name, Bank Name, and City
          </p>

          <button>
            <Link to="/all-banks" style={{ color: "white" }}>
              {" "}
              Click Here{" "}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;

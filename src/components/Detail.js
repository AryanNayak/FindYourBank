import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Detail = () => {
  const location = useLocation();
  const { from } = location.state;

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="row">
        <div className="col-md-5" style={{ width: "100%", color: "black" }}>
          <div className="project-info-box mt-0">
            <h5>
              <b>
                <p>
                  {" "}
                  <b>BANK DETAILS </b>{" "}
                </p>
              </b>
            </h5>
          </div>

          <div className="project-info-box">
            <p>
              <b>Bank:</b>
              {from.bank_name}
            </p>
            <p>
              <b>IFSC Code:</b> {from.ifsc}
            </p>
            <p>
              <b>Branch:</b>
              {from.branch}
            </p>
            <p>
              <b>Bank ID:</b>
              {from.bank_id}
            </p>
            <p>
              <b>State:</b>
              {from.state}
            </p>
            <p>
              <b>District:</b>
              {from.district}
            </p>
            <p>
              <b>City:</b>
              {from.city}
            </p>
            <p className="mb-0">
              <b>Address: </b>
              {from.address}
            </p>
          </div>
          <div className="col-md-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

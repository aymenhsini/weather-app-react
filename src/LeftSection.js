import React from "react";
import profilePic from "./img/profilePic.png";

const leftSection = (props) => {
  return (
    <div className="left_section">
      <div className="maka">
        <img src={profilePic} alt="" />
        <h1>Welcome to Maka Weather application</h1>
      </div>
      <form onSubmit={props.loadweather} className="form_container">
        <div>{props.error ? error() : ""}</div>
        <input type="text" placeholder="type city name..." name="city" />
        <input type="text" placeholder="type country name..." name="country" />
        <button>Get weather</button>
      </form>
    </div>
  );
};
const error = (props) => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default leftSection;

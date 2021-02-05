import React from "react";

const RightSection = (props) => {
  return (
    <div className="right_section">
      <div className="Card">
        {props.cityname ? (
          <h1 className="city_name">
            {props.cityname + "  "}
            {props.countryname}
          </h1>
        ) : null}

        <i
          className={`wi ${props.weatherIcon} `}
          style={{ fontSize: "48px", color: "#6bdce4" }}
        />

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1>
            {props.temp_celsius}
            <i className="wi wi-degrees" />C
          </h1>
        ) : null}

        {/* show max and min temp */}
        {maxminTemp(props.temp_min, props.temp_max)}
        {props.wind_speed ? (
          <h4>
            <i className="wi wi-strong-wind" />
            {props.wind_speed} <span style={{ fontSize: "15px" }}>km/hr</span>
          </h4>
        ) : null}

        {props.humidity ? (
          <h4>
            <i className="wi wi-humidity" />
            <span>{props.humidity}</span>
          </h4>
        ) : null}

        {/* Weather description */}
        <h4 className="description">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};
export default RightSection;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3 className="min-max-temp">
        <span className="span1">
          {min} <i className="wi wi-degrees" />C
        </span>

        <span>
          {max} <i className="wi wi-degrees" />C
        </span>
      </h3>
    );
  }
}

import React from "react";
import "./App.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import "weather-icons/css/weather-icons.css";

const Api_Key = "27d02a990530f4919f4d7469ac1c2e09";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      wind_speed: null,
      humidity: null,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  calWindSpeed(val) {
    let valeur = Math.floor(val * 3.6);
    return valeur;
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: response.name,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        wind_speed: this.calWindSpeed(response.wind.speed),
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: false,
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <>
        <div className="app_body">
          <div className="glass">
            <LeftSection
              loadweather={this.getWeather}
              error={this.state.error}
            />
            <RightSection
              cityname={this.state.city}
              countryname={this.state.country}
              weatherIcon={this.state.icon}
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              wind_speed={this.state.wind_speed}
              humidity={this.state.humidity}
              description={this.state.description}
            />
          </div>
        </div>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </>
    );
  }
}
export default App;

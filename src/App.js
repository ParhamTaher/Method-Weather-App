import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const API_KEY = "885c24dac664de0bc9186f32747cf51a";
const ROOT_URL_CURRENT = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ROOT_URL_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

class App extends Component {
  constructor() {
    super();

    this.state = {

      currentWeather: {},
      fiveDayForecast: [],
      input: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);

  }

/**
  async fetchData() {
      const res = await fetch();
      const json = await res.json();

      this.setState({ albums: json });

  }
  **/

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  getWeatherData(e) {
    e.preventDefault();
    console.log("Button working ", this.state.input);

    const url_current = `${ROOT_URL_CURRENT}&q=${this.state.input}`;
    const url_forecast = `${ROOT_URL_FORECAST}&q=${this.state.input}`;

    axios.get(url_current).then(
      response => this.setState({ currentWeather: response.data })
    );

    axios.get(url_forecast).then(
      response => this.setState({ fiveDayForecast: response.data })
    );

  }

  renderCurrent() {
    
    if (this.state.currentWeather.main != null) {
      return <div> {parseInt(this.state.currentWeather.main.temp - 273.15) + " C"} </div>
    } else {
      return <div> No data </div>
    }

    

  }

  renderForecast() {

   if (this.state.fiveDayForecast.list != null) {

      return this.state.fiveDayForecast.list.map( day => 
        <div> {parseInt(day.main.temp - 273.15) + " C"} </div>
      );
   } else {
    return <div> No data </div>
   }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <body className="my-body">
          <p className="App-intro">
            List:
          </p>
          Enter your current city:
          <input type="text" value={this.state.input} onChange={this.handleChange} />
          <button type="button" className="btn btn-primary" onClick={this.getWeatherData}>Primary</button>
          <div>
            Current Weather:
            {this.renderCurrent()}
          </div>
          <div>
            Five Day Forecast:
            {this.renderForecast()}
          </div>
        </body>     
      </div>
    );
  }
}

export default App;

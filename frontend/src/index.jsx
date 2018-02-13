import React from 'react';
import ReactDOM from 'react-dom';
import Geolocation from 'react-geolocation';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    // Latitude and longitude are passed in POST body
    const request = {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.Stringify({ lat: this.state.latitude, lon: this.state.longitude }),
    };
    const response = await fetch(`${baseURL}/weather`, request);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      description: '',
      latitude: '',
      longitude: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({ icon: weather.icon.slice(0, -1) });
    this.setState({ description: weather.description });
  }

  render() {
    const { icon } = this.state.icon;
    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt="weather icon" /> }
      </div>
      /*
      <div>
        <Geolocation
          render={
            ({
              fetchingPosition,
              position: { coords: { latitude, longitude } = {} } = {},
              error,
              getCurrentPosition
            }) =>
            <div>
              {icon}
              <p>{ this.state.description}</p>
              {this.setState({ latitude:latitude, longitude:longitude })}
            </div>
          }

        />
      </div>
      */
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);

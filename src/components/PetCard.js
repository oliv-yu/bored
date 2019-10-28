import React, { Component } from "react";
import Card from "./Card";
import { getCurrentPosition } from "./utils";

const axios = require("axios").default;
const CORS_PROXY = "https://ancient-escarpment-84180.herokuapp.com/";

class PetCard extends Component {
  constructor(props) {
    super(props);

    this.state = { coords: {}, index: 1, petList: [] };
  }

  _setCurrentLocation = async () => {
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;

      this.setState({
        coords: { lat: latitude, lng: longitude }
      });

      this._getAnimals();

      // Handle coordinates
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  _getAnimals = () => {
    const { lat, lng } = this.state.coords;

    axios
      .get(`${CORS_PROXY}https://api.petfinder.com/v2/animals`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PETFINDER_ACCESS_TOKEN}`
        },
        params: {
          type: "cat",
          location: `${lat}, ${lng}`,
          limit: 5,
          page: this.state.index
        },
        mode: "cors",
        credentials: "include"
      })
      .then(res => {
        this.setState({
          petList: res.data.animals
        });

        console.log(this.state.petList);
      })
      .catch(console.log);
  };

  _getNextAnimal = () => {
    this.setState(state => ({
      index: state.index + 1
    }));

    this._getAnimals();
  };

  componentDidMount() {
    this._setCurrentLocation();
  }

  render() {
    const { petList } = this.state;

    return (
      <Card size="lg" buttonText="Next" title="Adopt a Cat!">
        {petList.map((item, idx) => (
          <div key={idx}>
            {item.photos[0] && (
              <img
                className="card-img-top"
                src={item.photos[0].medium}
                alt={item.name}
              ></img>
            )}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="card-title">{item.name}</div>
            </a>
            <div className="card-text">{item.description}</div>
          </div>
        ))}
        <div>
          <button onClick={this._getNextAnimal} className="btn btn-primary">
            Next!
          </button>
        </div>
      </Card>
    );
  }
}

export default PetCard;

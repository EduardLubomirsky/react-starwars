import React, { Component } from 'react';
import SwapiService from '../../services/swapi.service';

import Spinner from '../spiner/index';
import './planet-details.css';
import { clearInterval } from 'timers';


export default class RandomPlanet extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.interval = setInterval(this.updatePlanet, 2000)
        //this.updatePlanet();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    onUpdateError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 3;

        this.swapiService.getPlanet(id).then((planet) => {
            this.setState({
                planet,
                loading: false,
                error: false
            });
        }).catch(this.onUpdateError);
    }

    render() {
        const { planet, loading, error } = this.state;
        const spinner = loading ? <Spinner /> : null;
        let content = !loading ? < PlanetView planet={planet} /> : null;
        if (error) {
            content = <ErrorView />
        }
        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
            </div>
        );
    }
}

const ErrorView = () => {
    return (
        <div>
            <div>Something went wrong!!!</div>
        </div>
    );
}

const PlanetView = ({ planet }) => {
    const { name, population, rotation, diameter, id } = planet;
    return (
        <React.Fragment>
            <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div className="w-100">
                <h4>
                    {name}
                </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population: </span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period: </span>
                        <span>{rotation}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter: </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
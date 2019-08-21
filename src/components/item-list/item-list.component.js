import React, { Component } from 'react';
import SwapiService from '../../services/swapi.service';
import Spinner from '../spiner';
export default class ItemList extends Component {
    swapiService = new SwapiService();

    state = {
        peopleList: null
    }

    componentDidMount() {
        this.swapiService.getAllPeople()
            .then(peoples => {
                this.setState({
                    peopleList: peoples
                })
            })
    }

    renderPeoples(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item" key={id}>
                    {name}
                </li>
            )
        });
    }

    render() {
        const {peopleList} = this.state
        if(!peopleList) {
            return <Spinner />
        }
        const peoples = this.renderPeoples(peopleList);
        return (
            <ul className="item-list list-group">
               {peoples}
            </ul>
        );
    }
}
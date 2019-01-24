import React, {PureComponent} from 'react';
import axios from 'axios';
import {BASE_URL} from "../../App";

import './CountryInfo.css';

class CountryInfo extends PureComponent {
    state = {
      loadedCountry: null
    };

    componentDidUpdate(prevProps) {
        if (this.props.code) {
            if (prevProps.code !== this.props.code) {
                axios.get(BASE_URL + '/rest/v2/alpha/' + this.props.code).then(response => {
                    const country = response.data;
                    return Promise.all(country.borders.map(border => {
                        return axios.get(BASE_URL + '/rest/v2/alpha/' + border).then(response =>  {
                            return response.data.name;
                        })
                    })).then(result => {
                        country['bordersByName'] = result;
                        this.setState({loadedCountry: country});
                        console.log(country);
                    });
                });
            }
        }
    };

    render() {
        if (this.state.loadedCountry) {
            const borders = this.state.loadedCountry.bordersByName.map((border, index) => (
                <li key={index}>{border}</li>
            ));

            return (
                <div className="CountryInfo">
                    <h2>{this.state.loadedCountry.name}</h2>
                    <p><b>Capital: </b>{this.state.loadedCountry.capital}</p>
                    <img src={this.state.loadedCountry.flag} width="100px" height="70px" alt=""/>
                    <h3>Borders:</h3>
                    <ul>{borders.length !== 0 ? borders : 'This country does not have borders !'}</ul>
                </div>
            );
        } else {return <p className="CountryInfo">Выберите страну...</p>;}
    }
}

export default CountryInfo;
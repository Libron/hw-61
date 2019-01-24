import React, {Component, Fragment} from 'react';
import CountryInfo from '../../components/CountryInfo/CountryInfo';
import axios from "axios";

import './CountriesPanel.css';

class CountriesPanel extends Component {
    state = {
        countries: [],
        selectedCountryCode: null
    };

    componentDidMount() {
        axios.get('/rest/v2/all?fields=name;alpha3Code').then(response => {
            this.setState({countries: response.data});
        });
    };

    getCountryInfo = alpha3Code => {
        this.setState({selectedCountryCode: alpha3Code});
    };

    render() {
        return (
            <Fragment>
                <section className="CountriesPanel">
                    <ol>
                        {this.state.countries.map(country=>(
                            <li
                                key={country.alpha3Code}
                                onClick={() => this.getCountryInfo(country.alpha3Code)}
                            >{country.name}</li>
                        ))}
                    </ol>
                </section>
                <CountryInfo code={this.state.selectedCountryCode} />
            </Fragment>
        );
    }
}

export default CountriesPanel;
import React, { useState } from 'react'
import Data from '../../Data/region'
import { Link } from 'react-router-dom'
import './style.css';

const Country = (props) => {
    const country = props.match.params.id
    let data = [];
    let curedCount = 0
    let currentConfirmedCount = 0
    let confirmedCount = 0

    let deadCount = 0
    let cities = []
    let [selectedCity, setSelectedCity] = useState({})

    let cityName = []
    let cityCuredCount = 0
    let cityCurrentConfirmedCount = 0
    let cityConfirmedCount = 0

    let cityDeadCount = 0
    let finalData = []
  
    Data.map(d => {
        if (d["countryEnglishName"] === props.match.params.id) {
            
            return data.push(d)
        }
    })

    data.map(d => {
        return (
            curedCount += d['curedCount'],
            currentConfirmedCount += d['currentConfirmedCount'],
            confirmedCount += d['confirmedCount'],

            deadCount += d['deadCount']
        )
    })
    data.map(d => {
        if(d['cities'] === null) {
            cities.push(d)
        }
        else if(d[ 'cities' ] !== null) {
            cities.push(d['cities']) 
            for (let i = 0; i < cities.length; i++) {
                if (cities[i] === null) {
                    cities.splice(i, 1)
                }
            }
        }
    })

    if(cities.length === 1) {
        cities.map(c => {
            return (
                cityCuredCount += c['curedCount'],
                cityCurrentConfirmedCount += c['currentConfirmedCount'],
                cityConfirmedCount += c['confirmedCount'],
                cityDeadCount += c['deadCount'],
                cityName.push(props.match.params.id),
                finalData.push(c)
            )
        })
        cityName = [...new Set(cityName)];
    }
    else if(cities.length > 1) {
        cities.map(c => {
            c.map(d => {
                return (
                    cityCuredCount += d['curedCount'],
                    cityCurrentConfirmedCount += d['currentConfirmedCount'],
                    cityConfirmedCount += d['confirmedCount'],
                    cityDeadCount += d['deadCount'],
                    cityName.push(d['cityEnglishName']),
                    finalData.push(d)
                )
            })
        })
    }
// }

const handleCitySelect = (city) => {
    let selected = []
    if(finalData[0]['cityEnglishName'] !== undefined) {
        selected = finalData.filter(datum => datum[ 'cityEnglishName' ] === city)
    }
    else if(selected['cityEnglishName'] === undefined) {
        selected = finalData.filter(datum => datum[ 'countryEnglishName' ] === city)
    }

    setSelectedCity(selected[0])


}
    return (
        <>
        <h1>{country}<br/></h1>
            <div>
                
                Cured Count: {curedCount} <br />
                Current Confirmed Count: {currentConfirmedCount}<br />
                Confirmed Count: {confirmedCount}<br />
                Dead Count: {deadCount}<br />
                <Link to="/countrylist">
                    Go back
                </Link><br />
                <div
                    className="column"

                >
                    <h2>Region</h2>
                    <ul className="cityUl">
                        {cityName.map((cn, idx) => (
                            <li
                                idx= {idx}
                                className="cityLi"
                                onClick={() => handleCitySelect(cn)}
                            >
                                {cn}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="column">
                    <h2>Statistics</h2>
                    <p>Cured Count: {selectedCity['curedCount']}</p>
                    <p>Current Confirmed Count: {selectedCity[ 'currentConfirmedCount' ]}</p>
                    <p>Possible Confirmed Count: {selectedCity['confirmedCount']}</p>
                    <p>Dead Count: {selectedCity['deadCount']}</p>
                </div>
            </div>

        </>
    )
}

export default Country;
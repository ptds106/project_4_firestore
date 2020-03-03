import React from 'react'
import { Wrapper } from './style';
import { Link } from 'react-router-dom'
import Data from '../../Data/region'


const CountryList = () => {
    const names = [];
    Data.map(ele => {
        return names.push(ele["countryEnglishName"])
    })
    let countryName = [...new Set(names)];
    for (let i = 0; i < countryName.length; i++) {
        if (countryName[i] === null) {
            countryName.splice(i, 1)
        }
    }
    return (
        <Wrapper>
            <h1>This site is made to be aware of COVID-19(Corona Virus).</h1>
            <ul>
                {countryName.map((c, id) => (
                    <li key={id}>
                        <Link to={c}>
                            {c}
                        </Link>
                    </li>

                ))}
            </ul>
        </Wrapper>

    )
}
export default CountryList;
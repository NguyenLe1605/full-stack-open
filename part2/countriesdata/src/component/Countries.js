import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({weather}) => {
    if (!weather) return null;
    return (
        <div>
            <h2>Weather in {weather.city}</h2>
            <p>temperature {weather.temp} Celcius</p>
            <img src={weather.icon} alt={weather.alt}/>
            <p>wind {weather.wind} m/s</p>
        </div>
    )
}

const Languages = ({languages}) => {
    return (
        <div>
            <h3>languages: </h3>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
        </div>
    )
}

const Country = ({country, show, onShowClick}) => {
    if (show) {
        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <Languages languages={country.languages} />
                <img src={country.flag.png} alt={country.flag.alt}></img>
            </div>
        )
    }

    return (
        <div>
            <span>{country.name} </span>
            <button onClick={()=>onShowClick(country.name)}>show</button>
        </div>
    );
}
const Countries = (props) => {
    const {countries, allows, onShowClick} = props;
    const [ weather, setWeather ] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        if (countries.length === 1) {
            const country = countries[0];
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
                .then(response => {
                    console.log(response.data);
                    const data = response.data;
                    const weather = {
                        city: country.capital,
                        name: data.weather[0].main,
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                        alt: `The weather in ${country.capital} today is ${data.weather[0].main}`,
                        wind: data.wind.speed,
                        temp: (data.main.temp - 273.15).toFixed(2),
                    }
                    console.log(weather);
                    setWeather(weather);
                }) 
        }
    }, [countries])

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <Country country={country} show={true} />
                <Weather weather={weather} />
            </div>
        )
    }

    if (countries.length <= 0) {
        return (
            <div>
                Please enter valid country name
            </div>
        )
    }

    return (
        <div>
            {countries.map(
                country => 
                <Country 
                key={country.name} 
                country={country} 
                show={allows.get(country.name)} 
                onShowClick={onShowClick}/>
            )}
        </div>
    )
}

export default Countries;
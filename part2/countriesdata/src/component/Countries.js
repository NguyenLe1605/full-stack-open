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
            <Country country={country} show={true} />
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
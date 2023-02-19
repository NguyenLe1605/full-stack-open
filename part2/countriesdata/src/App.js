import { useState, useEffect } from "react";
import SearchField from "./component/SearchField";
import Countries from "./component/Countries";
import axios from 'axios';

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [countries, setCountries] = useState([]);
  const [viewAllow, setViewAllow] = useState(new Map());

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countries = response.data.map(country => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : undefined,
          area: country.area,
          languages: country.languages ? Object.values(country.languages) : undefined,
          flag: country.flags,
        }));
        const views = new Map();
        countries.forEach(
          country => views.set(country.name, false)
        )
        console.log(countries);
        setCountries(countries);
        setViewAllow(views);
      });
  }, []);

  const handleChange = (event) => {
    const searchStr = event.target.value;
    const newView = new Map(viewAllow);
    newView.forEach((value, key) => {
      newView.set(key, false);
    })
    console.log(newView);
    setSearchField(searchStr);
    setViewAllow(newView);
  }

  const onShowClick = (name) => {
    const newView = new Map(viewAllow);
    newView.set(name, true);
    setViewAllow(newView);
  }

  const countriesToShow = searchField === '' ? [] : countries.filter(
    country => country.name.toLowerCase().search(searchField.toLowerCase()) != -1
  );

  return (
    <div>
      <SearchField value={searchField} onChange={handleChange}/>
      <Countries countries={countriesToShow} allows={viewAllow} onShowClick={onShowClick}/>
    </div>
  )
}

export default App;

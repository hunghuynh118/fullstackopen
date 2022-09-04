import { useEffect, useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Display from './components/Display';

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  const handleSearchChange = event => setNewSearch(event.target.value);

  const countriesToShow = newSearch
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(newSearch.toLowerCase())
      )
    : [];

  return (
    <div>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Display countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;

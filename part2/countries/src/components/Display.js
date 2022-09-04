import Country from './Country';
import Show from './Show';

const Display = ({ countriesToShow }) => {
  if (countriesToShow.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countriesToShow.length === 1)
    return <Country country={countriesToShow[0]} />;

  return countriesToShow.map(country => (
    <Show key={country.name.common} country={country} />
  ));
};

export default Display;

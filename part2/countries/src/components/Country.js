import Weather from './Weather';

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>
      capital {country.capital[0]}
      <br />
      area {country.area}
    </p>
    <h4>languages:</h4>
    <ul>
      {Object.entries(country.languages).map(([abbr, language]) => (
        <li key={abbr}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={country.name.common} width="150" />
    <Weather city={country.capital[0]} />
  </div>
);

export default Country;

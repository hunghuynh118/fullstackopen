import { useState } from 'react';

import Country from './Country';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Show = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  const handleShowClick = () => setShowCountry(!showCountry);

  if (!showCountry)
    return (
      <div>
        {country.name.common}
        <Button onClick={handleShowClick} text="show" />
      </div>
    );

  return (
    <div>
      {country.name.common}
      <Button onClick={handleShowClick} text="hide" />
      <Country country={country} />
    </div>
  );
};

export default Show;

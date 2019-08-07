import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function Language() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value) => {
      if (value) properties.push({name, value});
    }
    addProperty("Language", navigator.language);
    addProperty("Available Languages", navigator.languages.join(', '));
    setRows(properties);
  }, []);

  return (
    <TypeGroup>
      <Type
        command={'./probe supported languages'}
      />
      {rows.map(({name, value}) => (
        <Type
          result={`${name}: ${value}`}
        />
      ))}
    </TypeGroup>
    );
}

export default Language;

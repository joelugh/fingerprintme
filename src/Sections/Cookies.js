import React from 'react';
import Type from '../Terminal/Type';
import TypeGroup from '../Terminal/TypeGroup';

function Cookies() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value) => {
      if (value) properties.push({name, value});
    }

    document.cookie.split(';').forEach((c) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent)
      try {
        addProperty(key, JSON.parse(val));
      } catch (e) {
        addProperty(key, val);
      }
    });

    setRows(properties);
  }, []);

  return <TypeGroup>
        <Type
            command={'./probe cookies'}
        />
        {rows.map(({name, value}) => (
            <Type
                result={`${name}: ${value}`}
            />
        ))}
    </TypeGroup>
}

export default Cookies;

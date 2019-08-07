import React from 'react';
import Type from '../Terminal/Type';
import TypeGroup from '../Terminal/TypeGroup';

import UAParser from 'ua-parser-js';

function Hardware() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value) => {
      if (value) properties.push({name, value});
    }
    const parser = new UAParser();
    if (window.navigator) {
        addProperty("Cores (effective)", window.navigator.hardwareConcurrency);
        addProperty("Platform", window.navigator.platform);
        addProperty("RAM (min)", window.navigator.deviceMemory && `${window.navigator.deviceMemory}GB`);
    }
    addProperty("Architecture", parser.getCPU().architecture);
    setRows(properties);
  }, []);

  return <TypeGroup>
        <Type
            command={'./probe hardware'}
        />
        {rows.map(({name, value}) => (
            <Type
                result={`${name}: ${value}`}
            />
        ))}
    </TypeGroup>
}

export default Hardware;

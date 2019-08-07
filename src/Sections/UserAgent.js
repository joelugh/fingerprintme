import React from 'react';

import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

import UAParser from 'ua-parser-js';

function UserAgent() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value) => {
      if (value) properties.push({name, value});
    }
    const parser = new UAParser();
    // addProperty("UA", parser.getUA());
    addProperty("Operating System", parser.getOS().name);
    addProperty("Operating System Version", parser.getOS().version);
    addProperty("Browser", parser.getBrowser().name);
    addProperty("Browser Version", parser.getBrowser().version);
    addProperty("Browser Build Number", window.navigator.productSub);
    addProperty("Vendor", window.navigator.vendor);
    addProperty("Vendor Version", window.navigator.vendorSub);
    addProperty("Device Model", parser.getDevice().model);
    addProperty("Device Type", parser.getDevice().type);
    addProperty("Device Vendor", parser.getDevice().vendor);
    addProperty("Engine", parser.getEngine().name);
    addProperty("Engine Version", parser.getEngine().version);
    // addProperty("CPU Architecture", parser.getCPU().architecture);
    setRows(properties);
  }, []);

  return (
    <TypeGroup>
      <Type
        startDelay={2500}
        command={'./system config'}
      />
      {rows.map(({name, value}, idx) => (
        <Type
          result={`${name}: ${value}`}
        />
      ))}
    </TypeGroup>
    );
}

export default UserAgent;

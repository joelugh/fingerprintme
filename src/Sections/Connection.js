import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function Connection() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value) => {
        if (value) properties.push({name, value});
    }

    // Pull geolocation data from window object
    const geolocationData = window.geolocationData ? JSON.parse(window.geolocationData) : {};

    const {
      ip,
      isp,
      connection_type,
      organization,
  } = geolocationData;

    const {connection: {
        downlink,
        downlinkMax,
        effectiveType,
        rtt,
        saveData,
        type,
    } = {}} = navigator;

    addProperty("IP Address", ip);
    addProperty("ISP", isp);
    addProperty("Organisation", organization);
    addProperty("Connection Type", connection_type);
    addProperty("Download Speed", downlink && `${downlink} MBps`);
    // addProperty("Max Download Speed", `${downlinkMax} MBps`);
    addProperty("Effective Network Type", effectiveType);
    addProperty("Round-Trip Time", rtt);
    addProperty("Network Type", type);
    setRows(properties);
  }, []);

  return (
    <TypeGroup>
        <Type
              command={'./snoop networks params'}
        />
      {rows.map(({name, value}) => (
          <Type
                //   command={name}
              result={`${name}: ${value}`}
          />
      ))}
    </TypeGroup>
    );
}

export default Connection;

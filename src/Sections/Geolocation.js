import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function Geolocation() {

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
        continent_code,
        continent_name,
        country_code2,
        country_code3,
        country_name,
        country_capital,
        state_prov,
        district,
        city,
        zipcode,
        latitude,
        longitude,
        is_eu,
        calling_code,
        country_tld,
        languages,
        country_flag,
        isp,
        connection_type,
        organization,
        geoname_id,
        currency: {
            code: currency_code,
            name: currency_name,
            symbol: currency_symbol,
        } = {},
        time_zone: {
            name: tz_name,
            offset: tz_offset,
            current_time: tz_current_time,
            current_time_unix: tz_current_time_unix,
            is_dst: tz_is_dst,
            dst_savings: tz_dst_savings,
        } = {},
    } = geolocationData;
    // addProperty("IP Address", ip);
    addProperty("Continent", continent_name);
    addProperty("Country", country_name);
    addProperty("State/Province", state_prov);
    addProperty("District", district);
    addProperty("City", city);
    addProperty("Postcode", zipcode);
    addProperty("Latitude", latitude);
    addProperty("Longitude", longitude);
    // addProperty("ISP", isp);
    // addProperty("Organisation", organization);
    setRows(properties);
  }, []);

  return (
    <TypeGroup>
      <Type
        command={'./scraping location'}
      />
      {rows.length === 0 ?
        <Type
            result={`Failed.`}
        />
      :
        rows.map(({name, value}) => (
          <Type
            result={`${name}: ${value}`}
          />
        ))
      }
    </TypeGroup>
  );
}

export default Geolocation;

import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function MimeTypes() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const properties = [];
    const addProperty = (name, value, arr) => {
      if (!arr) arr = properties;
      if (value) arr.push({name, value});
    }
    const {mimeTypes} = navigator;
    for (let i=0; i < mimeTypes.length; i++) {
        let arr = [];
        const {type, description, suffixes, enabledPlugin} = mimeTypes[i];
        const {name, version, filename, description:pluginDescription} = enabledPlugin;
        addProperty(type, name, arr);
        // addProperty("Name", name, arr);
        // addProperty("Type", type, arr);
        // addProperty("Description", description, arr);
        // addProperty("Suffixes", suffixes, arr);
        // addProperty("Version", version, arr);
        // addProperty("Plugin Filename", filename, arr);
        // addProperty("Plugin Description", pluginDescription, arr);
        addProperty(name, arr);
    }
    setRows(properties);
  }, []);

  return (
    <TypeGroup>
      <Type
        command={'./probe browser plugins'}
      />
      {rows.length === 0 &&
        <Type
          result={'No plugins detected.'}
        />
      }
      {rows.length !== 0 && rows.map(({name, value}) => {
          return value.map(({name, value}) => {
            return <Type
                result={`${name}: ${value}`}
            />
          });
        })}
    </TypeGroup>
    );
}

export default MimeTypes;

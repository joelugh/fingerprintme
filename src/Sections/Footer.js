import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';
import UAParser from 'ua-parser-js';
import Wait from '../Terminal/Type/Wait';
import NewLine from '../Terminal/Type/NewLine';
import Text from '../Terminal/Type/Text';

function Footer() {

  const [rootkit, setRootkit] = React.useState("");

  React.useEffect(() => {

    const parser = new UAParser();
    let rootkitStr = "";
    if (parser.getOS().name) rootkitStr += parser.getOS().name + " ";
    if (parser.getOS().version) rootkitStr += parser.getOS().version + " ";
    if (parser.getBrowser().name) rootkitStr += parser.getBrowser().name + " ";
    if (parser.getBrowser().version) rootkitStr += parser.getBrowser().version;
    setRootkit(rootkitStr);

  }, []);

  return (
    <TypeGroup>
      <Type
        startDelay={4000}
        command={`./install ${rootkit} rootkit`}
      />
      <Wait
        wait={2000}
      />
      <Type
        result={'rootkit installed.'}
      />
      <Wait
        delay={2000}
      />
      <Type
        result={'jks.'}
      />
      <Wait
        delay={2000}
      />
      <NewLine />
      <Text
        text={"It's hard to take privacy seriously"}
        delay={100}
      />
      <Text
        startDelay={100}
        text={"until someone is attacking you..."}
        delay={500}
      />
      <Text
        startDelay={100}
        text={"and by then it's too late."}
        delay={500}
      />
      <NewLine />
      <Text
        text={"This is but half the fingermark you"}
        delay={100}
      />
      <Text
        startDelay={100}
        text={"leave on every website you visit."}
        delay={500}
      />
      <NewLine />
      <Text
        startDelay={100}
        text={"Be careful what you touch 🧤"}
      />
    </TypeGroup>
  );
}

export default Footer;

import React from 'react';
import adblockDetect from 'adblock-detect';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function Misc() {

  const [adBlock, setAdBlock] = React.useState();
  const [referrer, setReferrer] = React.useState();
  const [touchPoints, setTouchPoints] = React.useState();
  const [doNotTrack, setDoNotTrack] = React.useState();
  const [cookiesEnabled, setCookiesEnabled] = React.useState();
  const [javaEnabled, setJavaEnabled] = React.useState();
  const [clipboard, setClipboard] = React.useState(null);

  React.useEffect(() => {

    if (document.referrer) setReferrer(document.referrer);
    setTouchPoints(window.navigator.maxTouchPoints);
    setDoNotTrack(window.navigator.doNotTrack ? "True" : "False");
    setCookiesEnabled(window.navigator.cookieEnabled ? "True" : "False");
    setJavaEnabled(window.navigator.javaEnabled() ? "True" : "False");

    adblockDetect(function(adblockDetected) {

      if (adblockDetected) {
        setAdBlock("Ad blocker detected.");
      } else {
        setAdBlock("No ad blocker detected.");
      }

    }, {
      testInterval: 40,
      testRuns: 5
    });

    if (navigator.clipboard && navigator.clipboard.readText) navigator.clipboard.readText()
    .then(clipText => {
      console.log('Clipboard Dump:', clipText)
      setClipboard(`Clipboard Dump: "${clipText}"`)
    })
    .catch(err => {
      console.log('Clipboard Dump: Failed', err)
      setClipboard('Clipboard Dump: Failed')
    });

  }, []);

  return (
    <TypeGroup>
      {adBlock && <Type
        command={'./probe ad blocker'}
        result={adBlock}
      />}
      {referrer && <Type
        command={'./check history'}
        result={referrer}
      />}
      {touchPoints !== null && <Type
        command={'./probe touch capabilities'}
        result={`Max Touch Points: ${touchPoints}`}
      />}
      <Type
          command={'./probe permission settings'}
      />
      {doNotTrack !== null && <Type
        result={`Do Not Track: ${doNotTrack}`}
      />}
      {cookiesEnabled !== null && <Type
        result={`Cookies Enabled: ${cookiesEnabled}`}
      />}
      {javaEnabled !== null && <Type
        result={`Java Enabled: ${javaEnabled}`}
      />}
      {clipboard !== null && <Type
        command={'./scrape clipboard'}
      />}
      {clipboard !== null && <Type
        result={clipboard}
      />}
    </TypeGroup>
  );
}

export default Misc;

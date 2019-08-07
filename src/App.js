import './utils/arrayFromPolyfill';

import React from 'react';

import {
  Battery,
  Cookies,
  Connection,
  Geolocation,
  Hardware,
  Language,
  MimeTypes,
  Misc,
  Socials,
  UserAgent,
  Footer,
} from './Sections';

import Terminal from './Terminal';

function App() {

  return (
    <Terminal>
      <UserAgent />
      <Geolocation />
      <Socials />
      <Battery />
      <Hardware />
      <Connection />
      <Language />
      <MimeTypes />
      {/* <Cookies /> */}
      <Misc />
      <Footer />
    </Terminal>
  );
}

export default App;

import React from 'react';

import {TerminalContext} from '../index';

function Wait({
    delay = 1000,
}) {

    const onDone = React.useContext(TerminalContext);

    React.useEffect(() => {
        setTimeout(() => {
            onDone();
        }, delay);
    });

    return <div></div>;
}

export default Wait;
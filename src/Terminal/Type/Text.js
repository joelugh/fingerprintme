import React from 'react';

import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import './Type.css';

import {TerminalContext} from '../index';

function Text({
    text = "",
    startDelay = 1000,
    delay = 50,
}) {

    const onDone = React.useContext(TerminalContext);

    return (
        <Typist
            cursor={{
                show: true,
                blink: true,
                element: '█',
                hideWhenDone: true,
                hideWhenDoneDelay: delay,
            }}
            startDelay={startDelay}
            onTypingDone={() => {
                setTimeout(() => {
                    onDone()
                }, delay)
            }}
        >
            {text}
        </Typist>
    );
}

export default Text;
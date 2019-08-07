import React from 'react';

import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import './Type.css';

import {TerminalContext} from '../index';

function Type({
    command = "",
    result = "",
    onTypingDone = () => {},
    startDelay = 1000,
    newLine,
}) {
    const [done, setDone] = React.useState(false);
    const onDone = React.useContext(TerminalContext);

    const delay = 500;

    React.useEffect(() => {
        if (newLine) {
            setTimeout(() => {
                onDone();
            }, 50);
        } else if (result && !command) {
            setTimeout(() => {
                onDone();
            }, 50);
        }
    },[onTypingDone, command])

    if (command) {

        return (
            <>
            <Typist
                className="command"
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
                        setDone(true);
                        setTimeout(() => {
                            onDone()
                        }, delay)
                    }, delay)
                }}
            >
                {`$ ${command.toLowerCase().replace(/\s+/gi,'_')}`}
            </Typist>

            {done && <div>{result}</div>}
            </>
        );
    } else {

        return <div>{result}</div>

    }
}

export default Type;
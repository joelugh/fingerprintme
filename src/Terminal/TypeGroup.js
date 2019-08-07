import React from 'react';

import {TerminalContext} from './index';

function TypeGroup(props) {

    const [slice, setSlice] = React.useState(1);

    const onDone = React.useContext(TerminalContext);

    const timer = React.useRef(false);

    React.useEffect(() => {
        // Callback if type group is done
        clearInterval(timer.current);
        if (!props.children) {
            timer.current = setInterval(() => onDone && onDone(), 100) // wait 100ms for something to load
        } else {
            if (slice >= props.children.length) {
                onDone && onDone();
            } else if (React.Children.toArray(props.children)[slice-1] == null) {
                timer.current = setInterval(() => onDone && onDone(), 100) // wait 100ms for something to load
            }
        }
    }, [timer, slice, props.children, onDone])

    const onChildDone = () => {
        window.scrollTo(0, document.body.scrollHeight);
        setSlice(slice => slice + 1);
    }

    return React.Children.toArray(props.children).slice(0,slice).map((child, idx) =>
        <TerminalContext.Provider value={(idx === slice-1) ? onChildDone : () => {}}>
            {child}
        </TerminalContext.Provider>
    );
}

export default TypeGroup;
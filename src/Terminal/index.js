import React from 'react';

import TypeGroup from './TypeGroup';

export const TerminalContext = React.createContext();

function Terminal({children}) {

    return (
        <textfield style={{color: 'green'}}>
            <TypeGroup>
                {children}
            </TypeGroup>
        </textfield>
    );
}

export default Terminal;
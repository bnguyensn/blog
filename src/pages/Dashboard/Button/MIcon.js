'use strict';

import React from 'react';

// All styles defined in index.css
function MIcon(props) {
    return (
        <span className='micon'>
            <i className={`material-icons ${props.color}`}>
                {props.icon}
            </i>
        </span>
    )
}

export default MIcon
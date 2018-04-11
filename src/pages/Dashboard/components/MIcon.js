'use strict';

import React from 'react';

// All styles defined in index.css
function MIcon(props) {
    return (
        <span className='micon'>
            <i className={`material-icons ${props.light ? 'md-light' : 'md-dark'}`}>
                {props.icon}
            </i>
        </span>
    )
}

export default MIcon
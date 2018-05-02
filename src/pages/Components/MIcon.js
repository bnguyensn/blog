'use strict';

import React from 'react';

/**
 * Colors are defined in index.css
 * Sizes are defined in index.css
 * */
function MIcon(props) {
    return (
        <span className='micon'>
            <i className={`material-icons ${props.color} ${props.size}`}>
                {props.icon}
            </i>
        </span>
    )
}

export default MIcon
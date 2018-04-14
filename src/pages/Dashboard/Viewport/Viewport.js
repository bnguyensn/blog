'use strict';

import React, {PureComponent} from 'react';

/**
 * Data <ArticlePreview/> needs:
 *  - Article title {String}
 *  - Article date {String}
 *  - Article categories {Array}
 * */
class ArticlePreview extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='vp-ap'>
                <div className='vp-ap-title'>{this.props.title}</div>
                <div className='vp-ap-date'>{this.props.date}</div>
                <ul className='vp-ap-cat-container'>
                    {this.props.categories.map((category) =>
                        <li key={category}>{category}</li>
                    )}
                </ul>
            </div>
        )
    }
}

class Viewport extends PureComponent {

}

export default Viewport
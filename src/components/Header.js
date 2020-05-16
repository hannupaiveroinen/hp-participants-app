import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/fontawesome-free-solid'

class Header extends React.Component {
    render() {
        return (
            <div className='page-header'>
                <span style={{ display: 'inline-block', margin: '32px',  color: '#FFFFFF' }}>
                    <FontAwesomeIcon icon={faUserFriends} />
                </span>
                <span style={{color: '#FFFFFF' }}>Dummy Software Ltd</span>
            </div >
        )
    }
}

export default Header;
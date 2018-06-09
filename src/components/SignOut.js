import React from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';

const SignOutButton = ({ history }) => (
    <a 
        href='javascript:void(0)'
        className='nav-link'
        onClick={e => {
            auth.SignOut()
                .then(() => history.push(routes.LANDING));
            e.preventDefault();
        }}
    >
        Sign Out
    </a>
);

export default withRouter(SignOutButton);
import React from 'react';
import withAuthorization from './withAuthorization';

const DashboardPage = () => (
    <div>
        <h1>Dashboard Page</h1>
        <p>You can access this page because you're signed in!</p>
    </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(DashboardPage);
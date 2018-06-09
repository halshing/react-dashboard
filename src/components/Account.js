import React from 'react';
import AuthUserContext from './AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends React.Component {
    state = {
        pageMessage: undefined
    }

    updatePageMessage(message) {
        this.setState({ pageMessage: message });        
    }

    render() {
        const { pageMessage } = this.state;
        return(
            <AuthUserContext.Consumer>
                {authUser => 
                    <div className='account-page-container'>
                        <h2 className='pr-3'>Account</h2><h4>{authUser.email}</h4>
                        { pageMessage && <div className='page-message border bg-info p-3'>{pageMessage}</div> }
                        <h2 className='pt-3'>Password Change</h2>
                        <PasswordChangeForm setPageMessage={this.updatePageMessage.bind(this)} />
                    </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
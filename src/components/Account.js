import React from 'react';
import AuthUserContext from './AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountInfo = user => {
    user = user.user || null;
    return (
        <div>
            <h2 className='pr-3'>Account</h2>
            <h4>Name: {user ? user.fullname : 'You don\'t have a name!'}</h4>
            <h4>Email: {user ? user.email : 'You don\'t have an email!'}</h4>
            <h4>Username: {user ? user.username : 'You don\'t have a username!'}</h4>
        </div>
    )
}

const ChangePassword = method => (
    <div>
        <h2 className='pt-3'>Password Change</h2>
        <PasswordChangeForm setPageMessage={method} />
    </div>
);

const Notifications = () => (
    <div><h1>Notifications Tab</h1></div>
);

class AccountPage extends React.Component {
    state = {
        pageMessage: undefined,
        userInfo: undefined,
        render: undefined
    }

    updatePageMessage(message) {
        this.setState({ pageMessage: message });        
    }

    switchTab(name, e) {
        this.setState({ render: name })
        e.preventDefault();
    }

    _renderTabContent(userInfo) {        
        userInfo = userInfo && userInfo.profile ? userInfo.profile : null;
        if (userInfo) {
            switch(this.state.render) {
                case 'account-info': return <AccountInfo user={userInfo} />
                case 'password': return <ChangePassword method={this.updatePageMessage} />
                case 'notifications': return <Notifications />
                default: return <AccountInfo user={userInfo} /> 
            }
        }
    }

    componentDidMount() {
        this.setState({
            render: 'account-info'
        })
    }

    render() {
        const { pageMessage } = this.state;
        return(
            <AuthUserContext.Consumer>
                {userInfo => 
                    <div className='row'>
                        <div className='col-3'>
                            <div className='nav flex-column nav-pills' id='account-nav' role='tablist' aria-orientation='vertical'>
                                <a className='nav-link active' data-toggle='pill' onClick={this.switchTab.bind(this, 'account-info')} href='javascript:void(0)'>Account Info</a>
                                <a className='nav-link' data-toggle='pill' onClick={this.switchTab.bind(this, 'password')} href='javascript:void(0)'>Change Password</a>
                                <a className='nav-link' data-toggle='pill' onClick={this.switchTab.bind(this, 'notifications')} href='javascript:void(0)'>Notifications</a>
                            </div>
                        </div>
                        <div className='col-9'>
                            { pageMessage && <div className='page-message border bg-info p-3'>{pageMessage}</div> }
                            { this._renderTabContent.apply(this, [userInfo]) }
                        </div>
                    </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
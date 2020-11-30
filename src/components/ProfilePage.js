import React from 'react';
import './style.css'
import { Helmet } from 'react-helmet'

function ProfilePage(props) {
    const fullName = props && props.location && props.location.state && props.location.state.full_name;

    const handleLogOut = async () => {
        props.history.push({pathname: '/signin'})
    };

    const TITLE = 'Profile Page';
    
    return (
        <div className="auth-main-сontainer">
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <div className="auth-modal-container">
                <div className="auth-form auth-wrapper">
                    <h4>Profile Name: {fullName}</h4>
                    <button onClick={handleLogOut}>Log out</button>
                </div>
            </div>
        </div >
    );
}

export default ProfilePage;

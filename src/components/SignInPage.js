import React, { useState} from 'react'
import swal from 'sweetalert'
import './style.css'
import Loader from '../helpers/loader/loader'
import { Redirect } from "react-router-dom"
import AuthService from '../services/auth-service';
import ConnectyCube from 'connectycube'
import { Helmet } from 'react-helmet'


export default function SignInPage(props) {
    const inititalState = {
        isLoader: false,
        login: '',
        password: '',
        isAuthorization: false
    };
    const [state, setState] = useState(inititalState);
    const { login, password, isLoader, isAuthorization } = state;

    const changeLogin = (event) => setState({ ...state, login: event.target.value });

    const changePassword = (event) => setState({ ...state, password: event.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { login, password } = state;
        
        if (!login.trim() || !password.trim()) {
            swal('Warning', `Fill the fields to login.`);
            return
        }
        
        setState({ isLoader: true });
        
        const userCredentials = { login, password };
        await AuthService.createSession(userCredentials);
       
        await ConnectyCube.login(userCredentials)
            .then((user) => {
                console.log('#login, user: ', user);
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Account successfully logged in!',
                    showConfirmButton: false,
                    timer: 2500
                });

                props.history.push({
                    pathname: '/profile',
                    state: user
                })
            })
            .catch((error) => {
                console.log('#login, error: ', error);
            });
    };

    const switchSignUp = async () => {
        props.history.push({pathname: '/signup'})
    };

    const TITLE = 'Sign In';

    return (
        <div className="auth-main-сontainer" style={props.isSmallDevice && { backgroundColor: '#27ae60' }}>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <div className="auth-modal-container">
                {isLoader &&
                <div className="auth-wrapp-loader">
                    <Loader />
                </div>}

                {isAuthorization && <Redirect to="/signin" />}

                <form onSubmit={handleLogin} className="auth-form auth-wrapper">
                    <input
                        type="text"
                        value={login}
                        onChange={changeLogin}
                        required
                        placeholder="Login"
                        name="login" />
                    <input
                        type="password"
                        value={password}
                        onChange={changePassword}
                        required
                        placeholder="Password"
                        name="Password" />
                    <button type="submit" value="Submit">Sign in</button>
                    <a onClick={switchSignUp} className="switch-signup">Sign Up <br/> Don't have an account?</a>
                </form>
            </div>
        </div >
    )
}
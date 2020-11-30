import React, { useState} from 'react'
import swal from 'sweetalert'
import './style.css'
import Loader from '../helpers/loader/loader'
import { Redirect} from "react-router-dom"
import ConnectyCube from 'connectycube'
import AuthService from "../services/auth-service";
import { Helmet } from 'react-helmet'

export default function SignUpPage(props) {
    const initialState = {
        isLogin: true,
        isLoader: false,
        full_name: '',
        login: '',
        password: '',
        isAuthorization: false
    };
    const [state, setState] = useState(initialState);
    const {login, password, isLoader, isAuthorization, full_name} = state;
    
    const changeName = (event) => setState({...state, full_name: event.target.value});

    const changeLogin = (event) => setState({...state, login: event.target.value});

    const changePassword = (event) => setState({...state, password: event.target.value});

    const handleLogin = async (e) => {
        e.preventDefault();
        const { login, password, full_name, isLogin } = state;
        
        if (!login.trim() || !password.trim() || !isLogin && !full_name.trim()) {
            swal('Warning', `Fill the fields to sign up.`);
            return
        }
        
        setState({ isLoader: true });
    
        await AuthService.createSession();
        
        const userProfile = { login, password, full_name };

        await ConnectyCube.users
            .signup(userProfile)
            .then((user) => {
                console.log('#signup, user: ', user);
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Account successfully registered!',
                    showConfirmButton: false,
                    timer: 2500
                });
                props.history.push('/signin');
            })
            .catch((error) => {
                console.log('#signup, error: ', error);
            });
    };

    const switchSignUp = async () => {
        props.history.push({pathname: '/signin'})
    };

    const TITLE = 'Sign Up';
    
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
                        value={full_name}
                        onChange={changeName}
                        required
                        placeholder="Name"
                        name="Name"
                    />
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
                    <button type="submit" value="Submit">Sign up</button>
                    <a onClick={switchSignUp} className="switch-signup">Sign In <br/> Already have an account?</a>
                </form>
            </div>
        </div >
    )
}
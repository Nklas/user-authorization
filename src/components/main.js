import React, { useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AuthService from '../services/auth-service'
import Loader from '../helpers/loader/loader'

import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import ProfilePage from './ProfilePage';
import NotFound from './NotFound';

export default function Main(){
    const initialState = {
        routName: false,
        isLoader: true
    };
    const [state, setState] = useState(initialState);
    const { isLoader } = state;
    
    useEffect(() => {
        async function init() {
            const routLink = await AuthService.init();
            setState({ routName: routLink, isLoader: false });
        }
        init();
    }, []);

    return (
        <Router>
            {isLoader ?
                <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Loader />
                </div>
                : <Switch>

                    <Route exact path="/">
                        <Redirect to="/signin" />
                    </Route>
                    
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/profile" component={ProfilePage} />

                    <Route component={NotFound} />
                </Switch>
            }
        </Router>
    )
}
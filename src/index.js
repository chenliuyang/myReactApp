import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider} from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import reducer from './reducer'
import './config'
import BossInfo from './container/bossinfo/bossinfo'
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f
));
function Boss() {
    return <h2>BOSS</h2>
}
// 该学习7-3了
// router+redux
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
        
    </Provider>,

    document.getElementById('root')
);



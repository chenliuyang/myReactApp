import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider} from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import reducer from './reducer'
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config'
// 该学习第六章了

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f
));
console.log(store.getState())

// 登陆
//     没有登陆信息
// 页面 导航 + 显示 + 注销
//     erying
//     yiying
//     qibinglian
// router+redux
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*只渲染命中的第一个Route*/}
                <Route path='/login' exact component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to="/dashboard"/>
            </Switch>
        </BrowserRouter>
        
    </Provider>,

    document.getElementById('root')
);



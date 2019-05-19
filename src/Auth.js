import  React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { login, getUserData } from './Auth.redux';
// 两个reducer 每个reducer都有一个state
//需要合并reducer用combineReducer
@connect(
    state=>state.auth,
    { login, getUserData }
)

class Auth extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            data: {}
        }
    }
    componentWillMount () {
        this.props.getUserData()
    }

    render () {
        return (
            <div>
                <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
                {this.props.isAuth?<Redirect to='/dashboard'/>: null}
                <div>您没有权限，请登录</div>
                <button onClick={this.props.login}>登陆</button>
            </div>
        )
    }
}

export default Auth;
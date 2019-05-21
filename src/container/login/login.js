import React from 'react';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { imoocForm } from '../../component/imooc-form/imooc-form'


// function hello () {
//     console.log('react');
// }
//
//
// function WrapperHello(fu) {
//     return function() {
//         console.log('before say hello');
//         fu();
//         console.log('after say hello')
//     }
// }
//
// hello=WrapperHello(hello);
// hello();

// @WrapperHello
// class Hello extends React.Component {
//
//     render () {
//         return (
//             <div>
//                 hello react i love react
//             </div>
//         )
//     }
// }
//
// // 属性代理
// function WrapperHello (Comp) {
//     class WrapCom extends React.Component {
//
//         render () {
//             return (
//                 <div>
//                     <p>这是HOC高阶组件特有元素</p>
//                     <Comp{...this.props}></Comp>
//                 </div>
//             )
//         }
//     }
//     return WrapCom;
// }




@connect(
    state=>state.user,
    { login }
)
@imoocForm
class Login extends React.Component {
    constructor (props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register () {
        this.props.history.push('/register')
    }

    handleLogin () {
        this.props.login(this.props.state);
    }

    render () {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo!=='/login'? <Redirect to={this.props.redirectTo} />: null}
                <Logo></Logo>
                <h2>我是登录页</h2>

                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.handleLogin} type='primary'>登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;
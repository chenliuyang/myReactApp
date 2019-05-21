import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { register} from "../../redux/user.redux";
import '../../index.css';
import { imoocForm } from '../../component/imooc-form/imooc-form'

@connect(
    state=>state.user,
    { register }
)
@imoocForm
class Register extends React.Component {
    constructor (props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: '',
        //     type: 'genius', // 或者boss
        // };
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount () {
        this.props.handleChange('type', 'genius')
    }
    handleRegister () {
        console.log(this.props.state);
        this.props.register(this.props.state);
    }

    // handleChange (key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    render () {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg? <p className='error-msg'>{this.props.msg}</p>: null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('repeatpwd', v)}
                        >确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem
                            checked={this.props.state.type==='genius'}
                            onChange={()=>this.props.handleChange('type', 'genius')}
                        >牛人</RadioItem>
                        <RadioItem
                            checked={this.props.state.type==='boss'}
                            onChange={()=>this.props.handleChange('type', 'boss')}
                        >BOSS</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleRegister} >注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Register;
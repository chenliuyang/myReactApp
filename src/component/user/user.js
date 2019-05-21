import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout () {
        const alert = Modal.alert;
        alert('注销', '确认退出登陆吗？', [
            {text: '取消', onPress: () =>console.log('取消')},
            {text: '退出', onPress: () =>{
                browserCookie.erase('userid'); // 删除cookie
                this.props.logoutSubmit()
            }}
        ])
    }

    render () {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt='' />}
                    title={props.user}
                    message={props.type==='boss'? props.company: null}
                ></Result>
                <List
                    renderHeader={()=>'简介'}
                >
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v=>(
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.money?<Brief >薪资：{props.money}</Brief>:null}

                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout} >退出登陆</Item>
                </List>
            </div>
        ): <Redirect to={props.redirectTo} />
    }
}

export default User;
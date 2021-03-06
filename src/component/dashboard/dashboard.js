import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import {getMsgList, recvMsg} from "../../redux/chat.redux";
import QueueAnim from 'rc-queue-anim'

@connect(
    state=>state,
    { getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    componentDidMount () {
        if (this.props.chat.chatmsg.length) return;
        this.props.getMsgList();
        this.props.recvMsg();
    }
    render () {
        const pathname = this.props.location.pathname;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'list',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius',
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'list',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss',
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'me',
                title: '个人中心',
                component: User,
            },
        ];
        const page = navList.find(v=>v.path===pathname);
        console.log(page)
        return page?(
            <div>
                <NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div>
                    <QueueAnim duration={300}>
                    {/*<Switch>*/}
                        {/*{navList.map(v=>(*/}
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                        {/*))}*/}
                    {/*</Switch>*/}
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        ): <Redirect to='/login'></Redirect>
    }
}

export default Dashboard;
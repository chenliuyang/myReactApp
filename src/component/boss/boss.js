import React from 'react';
import axios from 'axios';
import { Card, whiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux';
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from '../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount () {
        this.props.getUserList('genius')
    }
    render () {
        console.log(this.state)
        return (
            <div>
                <UserCard userList={this.props.userList}></UserCard>
            </div>
        )
    }
}

export default Boss;
import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from "../../redux/chat.redux";
import { getChatId} from "../../util";

const socket = io('ws://localhost:9093');

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            text: '',
            showEmoji: false,
            msg: []
        }
    }
    componentWillMount () {

    }
    componentDidMount () {
        if (this.props.chat.chatmsg.length) return;
        this.props.getMsgList();
        this.props.recvMsg();
        // socket.on('recvmsg',  (msg)=>{
        //     console.log(msg)
        //     this.setState({
        //         msg: [...this.state.msg, msg.text]
        //     })
        // })
        this.fixCaeousel();
    }
    fixCaeousel () {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit () {
        socket.emit('sendmsg', {text: this.state.text});
        this.setState({
            text: ''
        });
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({
            text: ''
        })
    }
    // 学习10-6的4分19秒
    render () {
        const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 😪 😚 😙 😋 😝 🤤 😴 😷 🤒 🤕 🤮 😵 😎 🧐 😕 😟 😰 😭 😱 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 😪'.split(' ').filter(v=>v).map(v=>({text:v}));
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if (!users[userid]) {
            return null;
        }
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid);
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'></Icon>}
                    onLeftClick={()=>{
                        this.props.history.go(-1)
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >
                                {v.content}
                            </Item>
                        </List>
                        // <p key={v._id}>对方发来的：{v.content}</p>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} />}
                                className='chat-me'>
                                {v.content}
                            </Item>
                        </List>
                        // <p key={v._id}>我发过去的：{v.content}</p>
                    );
                    // return <p key={v._id}>{v.content}</p>
                })}
                <div style={{height:50}}></div>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:10}}
                                        onClick={()=>{
                                        this.setState({
                                            showEmoji:!this.state.showEmoji
                                        })
                                        this.fixCaeousel();
                                        }
                                        }
                                    >🙂</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?(<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    ></Grid>):null}

                </div>
            </div>
        )
    }
}

export default Chat;



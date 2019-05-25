import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    };

    handleClick (v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render () {
        console.log(this.props)
        return (
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    {this.props.userList.map(v=>(
                        v.avatar?(<Card
                            onClick={() => this.handleClick(v)}
                            key={v.user}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >

                            </Card.Header>
                            <Card.Body>
                                {v.type==='boss'?<div>公司：{v.company}</div>:null}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type==='boss'?<div>薪资：{v.money}</div>:null}
                            </Card.Body>
                        </Card>):null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default UserCard;

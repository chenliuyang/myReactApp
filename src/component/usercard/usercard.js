import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';

class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    };

    render () {
        return (
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    {this.props.userList.map(v=>(
                        v.avatar?(<Card key={v.user}>
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

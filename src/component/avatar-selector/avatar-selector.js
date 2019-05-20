
import React from 'react';
import { Grid, List } from 'antd-mobile'

class AvaterSelector extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        const avatarList = 'boy,cat,chicken,cow,deer,dog,fish,fox,girl,horse,man,pig,qingwa,rabbit,sheep,superman'.split(',')
            .map(v=>({
              icon: require(`../img/${v}.png`)  ,
                text: v
            }));
        const gridHeader = this.state.text? (<div><span>已选择头像</span><img style={{width:20}} src={this.state.icon} alt=""/></div>): <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    ></Grid>
                </List>
                头像选择
            </div>
        )
    }
}

export default AvaterSelector;
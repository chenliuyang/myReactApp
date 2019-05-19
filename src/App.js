import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { addGun, removeGun, addGunAsync} from "./index.redux";

// const mapStateToProps =  (state)=>{
//     return {num: state}
// };
// const actionCreators = {addGun, removeGun, addGunAsync};
// App = connect(mapStateToProps, actionCreators)(App); //修改为@connect

@connect(
    //你要state里面的属性
    state=>({num:state.counter}),
    //你要的什么方法放到props里，自动dispatch
    {addGun, removeGun, addGunAsync}
    )

class App extends Component {
    render () {
        console.log(this.props)
        return(
            <div>
                <h2>现在有机枪{this.props.num}</h2>
                <Button type='primary' onClick={this.props.addGun}>加机关枪</Button>
                <br/>
                <Button type='primary' onClick={this.props.addGunAsync}>拖两天加机关枪</Button>
                <br/>
                <Button type='danger' onClick={this.props.removeGun}>减机关枪</Button>
            </div>
        )
    }
}

export default App
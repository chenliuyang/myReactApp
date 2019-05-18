import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync} from "./index.redux";
import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'

class App extends Component {
    constructor (props) {
        super (props);
    }

    render () {
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
const mapStateToProps =  (state)=>{
    return {num: state}
};
const actionCreators = {addGun, removeGun, addGunAsync};

App = connect(mapStateToProps, actionCreators)(App);

export default App
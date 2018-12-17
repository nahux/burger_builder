import React, { Component }  from 'react';
import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';


export default class Layout extends Component {

	state = {
		showSideDrawer: true
	}

	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerSwitchHandler = () => {
		const show = this.state.showSideDrawer;
		this.setState({showSideDrawer: !show});
	}

	render() {
		return(
			<Aux>
				<Toolbar menuClicked={this.sideDrawerSwitchHandler}/> 
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

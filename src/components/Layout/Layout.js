import React, { Component }  from 'react';
import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';


export default class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return	{showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render() {
		return(
			<Aux>
				<Toolbar menuClicked={this.sideDrawerToggleHandler}/> 
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

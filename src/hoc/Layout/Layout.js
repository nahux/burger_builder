import React, { Component }  from 'react';
import classes from './Layout.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';


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

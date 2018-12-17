import React  from 'react';
import classes from './MenuButton.css';

const menuButton = (props) => (
	<div className={classes.Menu} onClick={props.clicked}>
		<div className={classes.Bar1}></div>
		<div className={classes.Bar2}></div>
		<div className={classes.Bar3}></div>
	</div>
);
export default menuButton;
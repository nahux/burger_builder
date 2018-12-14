import React  from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
	<div className={classes.BuildControl}> 
		
		<div className={classes.Label}> {props.ingredientLabel} </div>

		<button 
			className={classes.Less} 
			onClick={props.ingRemoved}
			disabled={props.disabled}> Less </button>
		
		<button 
			className={classes.More} 
			onClick={props.ingAdded}> More </button>
	</div>
);
export default buildControl;
import React, { Component }  from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends Component {
	
	shouldComponentUpdate(nextProps, nextState){
		//Only rerenders the modal if show has changed (if checkout changes)
		return nextProps.show !== this.props.show;
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div 	className={classes.Modal}
							style={{
											transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
										 	opacity: this.props.show ? '1' : '0'
										}}>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}
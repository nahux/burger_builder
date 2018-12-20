import React, { Component }  from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

export default class OrderSummary extends Component {

	//This should be a functional component

	render(){

		const ingredientsSummary = 
			Object.keys(this.props.ingredients)
				.map(igKey => {
					return (
						<li key={igKey}>
							<span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]} 
						</li>
					);
				});

		return (
			<Aux>
				<h3>Your order</h3>
				<p>A burger with the following ingredients:</p>
				<ul>
					{ingredientsSummary}
				</ul>
				<p>Total Price: <strong>$ {this.props.price.toFixed(2)}</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType={'Danger'} clicked={this.props.cancelClicked}>CANCEL</Button>
				<Button btnType={'Success'} clicked={this.props.continueClicked}>CONTINUE</Button>
			</Aux>
		);
	}
}
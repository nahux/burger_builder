import React  from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

	const ingredientsSummary = 
		Object.keys(props.ingredients)
			.map(igKey => {
				return (
					<li key={igKey}>
						<span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]} 
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
			<p>Continue to checkout?</p>
			<Button btnType={'Danger'} clicked={props.cancelClicked}>CANCEL</Button>
			<Button btnType={'Success'}>CONTINUE</Button>
		</Aux>
	);
};
export default orderSummary;
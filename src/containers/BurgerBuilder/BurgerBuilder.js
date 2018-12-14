import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.8,
	meat: 2
}

export default class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad:0,
			bacon:0,
			cheese:0,
			meat:0
		},
		totalPrice:4,
		purchasable:false,
		checkout: false
	}

	//Handler to add an ingredient
	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchasable(updatedIngredients);
	}
	//Handler to remove an ingredient
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount > 0){
			const updatedCount = oldCount - 1;
			const updatedIngredients = {...this.state.ingredients};
			updatedIngredients[type] = updatedCount;
			const oldPrice = this.state.totalPrice;
			const newPrice = oldPrice - INGREDIENTS_PRICES[type];
			this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
			this.updatePurchasable(updatedIngredients);
		}
	}

	//Check if there are ingredients added to order the burger
	updatePurchasable (ingredients) {
		//Turn the ingredients object into an array of the values
		const sum = Object.keys(ingredients)
									.map(igKey => {
										return ingredients[igKey];
									})
									//Convert the array of values into a single sum number
									.reduce((sum, elem) => {
										return sum + elem;
									},0);
		//Set purchasable true if the sum is > 0, which means there is at least one ingredient
		this.setState({purchasable: sum > 0});
	}

	//Check if Order Now was clicked to go to OrderSummary
	updateCheckout = () => {
		this.setState({checkout: true});
	}

	render() {
		//Disable buttons for the limit of ingredients
		const disabledInfo = { ...this.state.ingredients };
		//Set it to {salad:true, bacon: false, etc...}
		for(let key in disabledInfo){ disabledInfo[key] = disabledInfo[key] <= 0 }

		return (
			<Aux>
				<Modal show={this.state.checkout}>
					<OrderSummary ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					price={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.updateCheckout}
				/>
			</Aux>
		);
	}
}
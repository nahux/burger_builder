import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.8,
	meat: 2
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice:4,
		purchasable:false,
		checkout: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		//Get the ingredients from the server
		// axios.get('/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients:response.data});
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true});
		// 	});
	}

	//Handler to add an ingredient
	addIngredientHandler = (type) => {
		const oldCount = this.props.ings[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.props.ings
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
		const oldCount = this.props.ings[type];
		if(oldCount > 0){
			const updatedCount = oldCount - 1;
			const updatedIngredients = {...this.props.ings};
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

	//Cancel OrderSummary by clicking outside the Modal or the Cancel button
	cancelCheckoutHandler = () => {
		this.setState({checkout: false});
	}

	//Continue with checkout by clicking the continue button
	continueCheckoutHandler = () => {
		const queryParams = [];
		for (let ing in this.props.ings) {
			queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.props.ings[ing]));
		}
		queryParams.push('price='+this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname:'/checkout',
			search: '?' + queryString
		});
	}

	resetIngredients = () =>{
		const updatedIngredients = {...this.props.ings};
		for (let ing in updatedIngredients){
			updatedIngredients[ing] = 0;
		}
		this.setState({totalPrice: 4, ingredients: updatedIngredients, purchasable: false});
	}

	//Set the Burger UI or loading spinner if it didn't load
	showBurgerHandler() {
		//Show a p element with an error message if the ingredients weren't catched
		let burger = <p style={{ textAlign: 'center' }}>There's a problem with the server</p>
		if(!this.state.error) burger = <Spinner />;
		if(this.props.ings){
			//Disable buttons for the limit of ingredients
			const disabledInfo = { ...this.props.ings };
			//Set it to {salad:true, bacon: false, etc...}
			for(let key in disabledInfo){ disabledInfo[key] = disabledInfo[key] <= 0 }

			burger =
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						price={this.state.totalPrice}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.updateCheckout}
						resetIng={this.resetIngredients}/>
				</Aux>;
		}
		return burger;
	}

	//Set orderSummary or loading spinner if it didn't load
	showOrderSummaryHandler () {
		//If ingredients aren't loaded set it to null
		let orderSummary = null;
		//Check to display loading spinner
		if(this.props.ings){
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				cancelClicked={this.cancelCheckoutHandler}
				continueClicked={this.continueCheckoutHandler}
				price={this.state.totalPrice}/>
			if(this.state.loading){
				orderSummary = <Spinner />
			}
		}
		return orderSummary;
	}

	render() {
		//Assign the burger and the burger controls or the Loading Spinner
		let spinnerOrBurger = this.showBurgerHandler();
		//Assign the orderSummary or the loading Spinner
		let spinnerOrOrderSummary = this.showOrderSummaryHandler();

		return (
			<Aux>
				<Modal show={this.state.checkout} modalClosed={this.cancelCheckoutHandler}>
					{spinnerOrOrderSummary}
				</Modal>
				{spinnerOrBurger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		ings: state.ingredients
	};
}

const mapDispatchToProps = (dispatch) =>{
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));

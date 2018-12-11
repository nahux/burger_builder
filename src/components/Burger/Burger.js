import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
	
	//We receive an ingredients Object with properties as the ingredients and the value is te amount
	//We transform that into an array of an array of BurgerIngredients 
	//Example: [ ([(salad1),(salad2)]), ([(cheese1)]), ([(meat1)]) ]
	let ingredientsArray = Object.keys(props.ingredients)
		.map( igKey => {
				return [...Array(props.ingredients[igKey])].map((_, i) => {
					return <BurgerIngredient key={igKey + i} type={igKey} />;
				});
			})
		//We reduce the array to make it look: [ (salad1),(salad2), (cheese1), (meat1) ]
		.reduce((arr,el) => {
			return arr.concat(el)
		},[]);
	if(ingredientsArray.length === 0){
		ingredientsArray = <p> Please start adding ingredients </p>;
	}
	return(
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			{ingredientsArray}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
};

export default burger;
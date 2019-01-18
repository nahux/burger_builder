import React from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

  state = {
    ingredients: {
      salad:1,
      meat:1,
      cheese:1,
      bacon:1
    },
    totalPrice: 0
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()){
      if(param[0] === 'price'){
        price = param[1];
      }else{
        //['salad','1']
        ingredients[param[0]] = +param[1]; //+params to convert it into a number
      }
    }
    this.setState({ingredients: ingredients, totalPrice:price});
  }

  continueHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Checkout Page</h1>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continue={this.continueHandler}
          cancel={this.cancelHandler}/>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData  ingredients={this.state.ingredients}
                                            price={this.state.totalPrice}
                                            {...props}/>)}/>
      </div>
    );
  }
}

export default Checkout;

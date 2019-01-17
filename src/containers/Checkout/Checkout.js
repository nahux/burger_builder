import React from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {

  state = {
    ingredients: {
      salad:1,
      meat:1,
      cheese:1,
      bacon:1
    }
  }

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()){
      //['salad','1']
      ingredients[param[0]] = +param[1]; //+params to convert it into a number
    }
    this.setState({ingredients: ingredients});
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
      </div>
    );
  }
}

export default Checkout;

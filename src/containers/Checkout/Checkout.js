import React from 'react'
import PropTypes from 'prop-types'

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

  render () {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Checkout Page</h1>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;

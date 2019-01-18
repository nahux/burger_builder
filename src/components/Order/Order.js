import React from 'react'
import PropTypes from 'prop-types'

import classes from './Order.css';

const Order = (props) => {

  const ingredients =
    Object.keys(props.ingredients)
      .map(igKey => {
        return (
            <span
                key={igKey}
                style={{textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'}}>
                  {igKey} : {props.ingredients[igKey]}
            </span>
        );
      });

  return (
    <div className={classes.Order}>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>Price: $</strong>{props.price}</p>
    </div>
  )
}

export default Order;

import React from 'react'
import PropTypes from 'prop-types'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes great!</h1>
      <div style={{width:'100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        btnType="Danger"
        clicked={props.cancel}>Cancel</Button>
      <Button
        btnType="Success"
        clicked={props.continue}>Continue</Button>
    </div>
  )
}

export default CheckoutSummary

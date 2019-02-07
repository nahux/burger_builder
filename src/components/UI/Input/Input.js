import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const input = (props) => {

  let input = null;
  const inputClasses = [classes.InputElement];

  let validationError = null;
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    validationError = <p style={{color:'red'}}>Please enter a valid value</p>;
  }

  switch (props.elementType) {
    case 'input':
      input = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
      break;
    case 'textarea':
      input = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
      break;
    case 'select':
      input = (
        <select
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option =>(
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            ))}
        </select>
              );
      break;
    default:
      input = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
      {validationError}
    </div>
  )
}

export default input

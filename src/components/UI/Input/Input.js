import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const input = (props) => {

  let input = null;
  switch (props.elementType) {
    case 'input':
      input = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
      break;
    case 'textarea':
      input = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
      break;
    case 'select':
      input = (
        <select
            className={classes.InputElement}
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
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  )
}

export default input

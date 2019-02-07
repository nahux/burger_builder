import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

  state = {
    orderForm: {
  		name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
  		street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
  		zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
  		country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
  		email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
			deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value:'fastest', display:'Fastest'},
            {value:'cheapest', display:'Cheapest'}
          ]
        },
        value: 'fastest',
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    //I don't want to set the request automatically so the page doesn't refresh
    event.preventDefault();
    this.setState({loading: true});
    //Get the contact data from the form
    const formData = {};
    for(let formElementKey in this.state.orderForm){
      formData[formElementKey] = this.state.orderForm[formElementKey].value;
    }
		//Build the order object
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
      orderData: formData
		}

		//For now I communicate with the firebase service and post the order
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading:false});
        this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading:false});
		});
  }

  checkValidity(value, rules) {
    let isValid = true;
    if(rules){
      if(rules.required){
        isValid = value.trim() !== '' && isValid;
      }
      if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
      }
      if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
      }
    }
    return isValid;
  }

  changedHandler = (event, inputIdentifier) => {
    //We make a copy of the state
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    //and a copy of the element of the state we need
    //because we shouldn't modify the orifinal state
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    //We update the value with the event and set the state
    updatedFormElement.value = event.target.value;
    //Check the validity of the element if it was changed
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //Set touched to true
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    //Check all the fields to see if the form is valid
    let formIsValid = true;
    for(let inputId in updatedOrderForm){
      if(!updatedOrderForm[inputId].valid){
        formIsValid = updatedOrderForm[inputId].valid;
        break;
      }
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render () {
    //Create the form dynamically
    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config:this.state.orderForm[key]
      });
    }
    let form = null;
    if(this.state.loading){
      form = <Spinner />
    }
    else {
      form = (<form onSubmit={this.orderHandler}>
                <h4>Contact Data</h4>
                {formElementsArray.map(formElement => (
                  <Input  key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          changed={(event) => this.changedHandler(event,formElement.id)}
                          invalid={!formElement.config.valid}
                          touched={formElement.config.touched}
                          shouldValidate={formElement.config.validation}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
              </form>);
    }
    return(
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

export default ContactData;

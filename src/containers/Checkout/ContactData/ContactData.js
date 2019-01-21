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
        value: ''
      },
  		street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
  		zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
      },
  		country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
      },
  		email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
      },
			deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value:'fastest', display:'Fastest'},
            {value:'cheapest', display:'Cheapest'}
          ]
        },
        value: '',
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
		//Build the order object with dummy data
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
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
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
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
      form = (<form>
                <h4>Contact Data</h4>
                {formElementsArray.map(formElement => (
                  <Input  key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          changed={(event) => this.changedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

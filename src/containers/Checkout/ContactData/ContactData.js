import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends React.Component {

  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
		//Build the order object with dummy data
		const order = {
			ingredients: this.state.ingredients,
			price: this.props.price,
			customer: {
				name: this.state.name,
				address: {
					street: this.state.adress.street,
					zipCode: this.state.adress.postalCode,
					country: 'Argentina'
				},
				email: this.state.email
			},
			deliveryMethor: 'fastest'
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

  render () {
    let form = null;
    if(this.state.loading){
      form = <Spinner />
    }
    else {
      form = (<form>
                <h4>Contact Data</h4>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Your street adress" />
                <input type="text" name="postal" placeholder="Your postal code" />
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

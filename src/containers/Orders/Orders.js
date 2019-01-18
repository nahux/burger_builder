import React from 'react'
import PropTypes from 'prop-types';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {

  state = {
    orders:[],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data){
          fetchedOrders.push({
            ...response.data[key],
            id:key
          });
        }
        this.setState({loading:false, orders:fetchedOrders})
      })
      .catch(error => {
        this.setState({loading:false})
      });
  }

  render () {
    let orders = null;
    // if(this.state.orders != null){
    //   orders = Object.keys(this.state.orders)
    //     .map(orderKey => {
    //       return (
    //         <Order  key={orderKey}
    //                 ingredients={this.state.orders[orderKey].ingredients}
    //                 price={this.state.orders[orderKey].price} />
    //       );
    //     });
    // }

    return (
      <div>
        {this.state.orders.map(order => (
          <Order  key={order.id}
                  price={order.price}
                  ingredients={order.ingredients} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route render={() => <h1 style={{textAlign:'center', margin:'auto'}}>Ooops page wasn't found</h1>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

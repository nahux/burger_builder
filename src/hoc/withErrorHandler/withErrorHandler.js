import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    //We use componentWillMount to intercept the ajax before the chil components are rendered
    componentWillMount(){
      //Add interceptors to set the error state in the response or clear it with a request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor =axios.interceptors.response.use(res => res, error =>{
        this.setState({error: error});
      })
    }

    //We need to eject the interceptors when the component is unmounted
    //otherwise these interceptors still remain in memory and can cause trouble
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }

  }
}

export default withErrorHandler;

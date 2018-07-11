import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace({pathname : '/checkout/contact-data'})
    }
    
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler} />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
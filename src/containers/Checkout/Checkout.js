import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace({pathname : '/checkout/contact-data'})
    }

    render(){
        let summary = <Redirect to='/' />

        if(this.props.ings){
          const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null; 
          summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler} />
                    <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
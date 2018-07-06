import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading : true})
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price.toFixed(2),
            customer : {
                name : 'Chirag',
                address : {
                    street : 'Dhingra Market',
                    zipCode : '131101',
                    country : 'India'
                },
                email : 'malhotrachirag2838@gmail.com'
            },
            dileveryMethod : 'fastest'
        }
        
        axios.post('/orders.json', order).then(response => {
            this.setState({loading : false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
        });
    }
    
    render(){
        
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        
        if(this.state.loading){
            form = <Spinner />
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
} 

export default ContactData;
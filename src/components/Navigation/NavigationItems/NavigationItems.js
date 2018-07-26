import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>My Orders</NavigationItem>
        <NavigationItem link='/auth'>Authenticate</NavigationItem>        
    </ul>
);

export default NavigationItems;
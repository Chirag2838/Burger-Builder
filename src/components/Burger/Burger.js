import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js'

const Burger = props => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKeys => {
            return [...Array(props.ingredients[igKeys])].map((_, i) => {
                return <BurgerIngredients key = {igKeys + i} type = {igKeys} />
            });
        })
        .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please start adding Ingredients</p>
    }        
            
    return (
        <div className = {classes.Burger}>
            <BurgerIngredients type = "bread-top" />
            {transformIngredients}
            <BurgerIngredients type = "bread-bottom" />
        </div>
    );
}

export default Burger;
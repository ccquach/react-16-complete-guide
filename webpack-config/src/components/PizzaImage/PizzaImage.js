import React from 'react';

import classes from './PizzaImage.css';
import PizzaImage from '../../assets/362 pizza.jpg';

const pizzaImage = props => (
  <div className={classes.PizzaImage}>
    <img src={PizzaImage} alt="pizza" className={classes.PizzaImg} />
  </div>
);

export default pizzaImage;

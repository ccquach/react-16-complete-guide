import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from './Burger';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

configure({ adapter: new Adapter() });

describe('<Burger />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Burger ingredients={{ bacon: 0, cheese: 0, salad: 0, meat: 0 }} />
    );
  });

  it('should tell the user to add ingredients if there are none', () => {
    expect(wrapper.contains(<p>Please start adding ingredients!</p>)).toEqual(
      true
    );
  });

  const containsIngredients = { bacon: 1, cheese: 1, salad: 1, meat: 1 };

  it('should render six <BurgerIngredient /> elements (2 bread, 4 ingredients)', () => {
    wrapper.setProps({ ingredients: containsIngredients });
    expect(wrapper.find(BurgerIngredient)).toHaveLength(6);
  });

  it('should render a <BurgerIngredient /> for each type of ingredient', () => {
    wrapper.setProps({ ingredients: containsIngredients });
    expect(
      wrapper.contains([
        <BurgerIngredient type="bacon" />,
        <BurgerIngredient type="cheese" />,
        <BurgerIngredient type="salad" />,
        <BurgerIngredient type="meat" />,
      ])
    ).toEqual(true);
  });
});

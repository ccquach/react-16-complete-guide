import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import each from 'jest-each';

import BurgerIngredient from './BurgerIngredient';

configure({ adapter: new Adapter() });

describe('<BurgerIngredient />', () => {
  each(['bread-bottom', 'bread-top', 'meat', 'cheese', 'salad', 'bacon']).test(
    'returns a <div /> element with the ingredient name class',
    ingredientName => {
      const wrapper = shallow(<BurgerIngredient type={ingredientName} />);
      if (ingredientName === 'bread-top')
        expect(wrapper.find('div')).toHaveLength(3);
      else expect(wrapper.find('div')).toHaveLength(1);
    }
  );
});

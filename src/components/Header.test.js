// MyComponent.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe("Header", () => {
  it("should render my component", () => {
    const wrapper = shallow(<Header />);
  });
});
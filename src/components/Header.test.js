import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';

configure({ adapter: new Adapter() });
describe("Header", () => {

  it("should render my component", () => {
    const wrapper = shallow(<Header />);
  });


  it('renders page header message', () => {
    const wrapper = shallow(<Header />);
    const header = "Dummy Software Ltd";
    expect(wrapper.contains(header)).toEqual(true);
  });

});
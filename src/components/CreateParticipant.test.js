import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateParticipant from './CreateParticipant';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe("CreateParticipant", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <CreateParticipant />
      </Provider>
    );
  });

  it("should render my component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
   
  it('should dispatch an action on add participant click', () => {
    // TODO
  });
});
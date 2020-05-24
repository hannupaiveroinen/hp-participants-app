import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ParticipantsTable from './ParticipantsTable';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe("ParticipantsTable", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: [],
    });

    component = renderer.create(
      <Provider store={store}>
        <ParticipantsTable />
      </Provider>
    );
  });

  it("should render my component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should return 20 participants by default", () => {
    // TODO
  });
});
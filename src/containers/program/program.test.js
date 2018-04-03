// @jest
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import asProgram from './program';
import { rendersCorrect, matchesSnapshot } from '../../utils/test-utilities';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

class TestComponent extends React.Component {
  render() {
    return <div />;
  }
}

const DecoratedComponent = asProgram({ allowMultipleInstances: false })(
  TestComponent,
);
const getMinComponent = () => <DecoratedComponent store={store} />;

it('AsProgram HOC renders to snapshot correctly', () => {
  matchesSnapshot(getMinComponent());
});

it('AsProgram HOC renders correctly', () => {
  rendersCorrect(getMinComponent());
});

it('AsProgram passed props successfully through', () => {
  const wrapper = shallow(<DecoratedComponent store={store} />);
  console.log(wrapper.props());
  expect(wrapper.props().closeProgramByWindowId).toBeDefined();
  expect(wrapper.props().closeProgramsByProgramId).toBeDefined();
  expect(wrapper.props().openProgram).toBeDefined();
});

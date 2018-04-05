// @jest
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { rendersCorrect, matchesSnapshot } from '../../utils/test-utilities';
import DesktopContainer, { Desktop } from './desktop';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

const minProps = {
    contents: {},
    activePrograms: [],
    openProgram: () => { },
};

const getMinComponent = (otherProps = {}) => (
    <Desktop {...minProps} {...otherProps} />
);

const getMinConnectedComponent = (otherProps = {}) => (
    <DesktopContainer store={store} {...minProps} {...otherProps} />
);

it('Desktop renders correctly', () => {
    rendersCorrect(getMinComponent());
});

it('Desktop matches snapshot correctly', () => {
    matchesSnapshot(getMinComponent());
});

it('DesktopContainer renders correctly', () => {
    rendersCorrect(getMinConnectedComponent());
});

it('DesktopContainer matches snapshot', () => {
    matchesSnapshot(getMinConnectedComponent());
});
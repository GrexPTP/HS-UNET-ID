import React from 'react';
import renderer from 'react-test-renderer';
import 'react-native-gesture-handler/jestSetup';
import App from './App';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';



jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});



describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { ApolloProvider } from "@apollo/client";
import ShallowRenderer from 'react-test-renderer/shallow';


// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toEqual(ApolloProvider);
});

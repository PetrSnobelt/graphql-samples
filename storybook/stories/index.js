import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import {Rest} from '../components/rest-basic.js'
import RestComponent from '../components/rest-component.js'
import RestCompWithParams from '../components/rest-component-params.js'

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

stories.add('with emoji', () => (
  <button
    disabled={boolean('Disabled', false)}
    onClick={action('clicked')}>
    {text('Label', '😀 😎 👍 💯')}
  </button>
));

// Knobs as dynamic variables.
stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});

stories.add('basic rest', () => {
  return <Rest />
  // return <h3>Rest</h3>
})

stories.add('rest component', () => {
  return <RestComponent />
})

stories.add('rest with params', () => {
  const personId = number('id', 2);
  return <RestCompWithParams personId={personId}  />
})
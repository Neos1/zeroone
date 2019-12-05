import React from 'react';
import Questions from '.';
import Question from './ShortQuestion';

export default ({ title: 'Questions' });

export const Wrapper = () => (
  <Questions />
);

export const defaultQuestion = () => <Question />;

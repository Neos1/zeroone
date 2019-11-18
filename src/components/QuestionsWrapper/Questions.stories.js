import React from 'react';
import QuestionsWrapper from '.';
import Question from './Question/Question';

export default ({ title: 'Questions' });

export const Wrapper = () => (
  <QuestionsWrapper />
);

export const defaultQuestion = () => <Question />;

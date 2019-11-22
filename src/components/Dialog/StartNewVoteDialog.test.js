import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import StartNewVoteDialog from './StartNewVoteDialog';

describe('StartNewVoteDialog', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider
        dialogStore={{}}
      >
        <StartNewVoteDialog />
      </Provider>,
    ).dive().dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});

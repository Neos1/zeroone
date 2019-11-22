import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import VoterListDialog from './VoterListDialog';

describe('VoterListDialog', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider
        dialogStore={{
          show: () => {},
          hide: () => {},
          add: () => {},
        }}
      >
        <VoterListDialog />
      </Provider>,
    ).dive().dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});

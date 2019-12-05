// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.require = (param) => {
  switch (param) {
    case 'path':
      return {
        join: jest.fn(),
      };
    default:
      return jest.fn();
  }
};

configure({ adapter: new Adapter() });

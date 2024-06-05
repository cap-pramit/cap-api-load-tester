import deploymentDetailsReducer, {initialState} from '../reducer';
import { fromJS } from 'immutable';

describe('deploymentDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(deploymentDetailsReducer(undefined, {})).toEqual(initialState);
  });
});

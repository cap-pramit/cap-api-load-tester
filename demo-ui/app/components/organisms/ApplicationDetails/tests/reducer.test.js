import applicationDetailsReducer, {initialState} from '../reducer';

describe('applicationDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(applicationDetailsReducer(undefined, {})).toEqual(initialState);
  });
});

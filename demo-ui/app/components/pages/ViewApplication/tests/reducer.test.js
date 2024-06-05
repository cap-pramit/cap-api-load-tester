import viewApplicationReducer, { initialState } from '../reducer';

describe('viewApplicationReducer', () => {
  it('returns the initial state', () => {
    expect(viewApplicationReducer(undefined, {})).toEqual(initialState);
  });
});

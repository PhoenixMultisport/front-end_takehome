import practitionerReducer from '../practitioner/reducer';
import * as Constants from '../practitioner/constants';
import '@testing-library/jest-dom';

const practitioner = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  address: '4611 Newton Street, Minneapolis, Minnesota, US',
  phone: '1234567890',
  fax: '5551234567',
  email: 'test@user.com'
};

describe('pactitioner reducers', () => {
  it('should return practitioners list', () => {
    const initialState = {};
    const action = { type: Constants.FETCH_PRACTITIONERS_SUCCESS, payload: {practitioners: [practitioner]}};
    const state = practitionerReducer(initialState, action);

    expect(state.practitioners.length).toEqual(1);
  });

  it('should empty practitioners list', () => {
    const error = new Error('Unknown Error');
    const initialState = {practitioners: []};
    const action = { type: Constants.FETCH_PRACTITIONERS_FAILURE, payload: { error }};
    const state = practitionerReducer(initialState, action);

    expect(state.practitioners.length).toEqual(0);
    expect(state.error.message).toEqual('Unknown Error');
  });

  it('should updated practitioners list', () => {
    const initialState = {practitioners: [practitioner]};
    const action = { type: Constants.UPDATE_PRACTITIONER_SUCCESS, payload: {...practitioner, phone: '78965401234'}};
    const state = practitionerReducer(initialState, action);

    expect(state.practitioners[0].phone).toEqual('78965401234');
  });
});

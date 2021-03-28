import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

function* userSaga(api) {
  const action = yield take('REQUEST_USER');
  const user = yield call(api.fetchUser, action.payload);  
  yield put({ type: 'RECEIVE_USER', payload: user });
}

it('just works!', () => {
  const api = {
    fetchUser: id => ({ id, name: 'Tucker' }),
  };

  return expectSaga(userSaga, api)
    // Assert that the `put` will eventually happen.
    .put({
      type: 'RECEIVE_USER',
      payload: { id: 42, name: 'Tucker' },
    })

    // Dispatch any actions that the saga will `take`.
    .dispatch({ type: 'REQUEST_USER', payload: 42 })

    // Start the test. Returns a Promise.
    .run();
});
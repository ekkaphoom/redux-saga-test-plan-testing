import { call, select, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

const HAVE_BIRTHDAY = 'HAVE_BIRTHDAY';
const UPDATE_DOG = 'UPDATE_DOG';

const initialState = {
  dog: {
    name: 'Tucker',
    age: 11,
  },
};

function reducer(state = initialState, action) {
  if (action.type === HAVE_BIRTHDAY) {
    return {
      ...state,
      dog: {
        ...state.dog,
        age: state.dog.age + 1,
      },
    };
  }

  return state;
}

const getDog = state => state.dog;

function* saga(api) {
  yield take(UPDATE_DOG);
  const dog = yield select(getDog);
  yield call(api.updateDog, dog);
}

it('handles reducers', () => {
  const api = { updateDog() {} };

  return expectSaga(saga, api)
    .withReducer(reducer)

    .call(api.updateDog, {
      name: 'Tucker',
      age: 12,
    })

    .dispatch({ type: HAVE_BIRTHDAY })
    .dispatch({ type: UPDATE_DOG })

    .run();
});
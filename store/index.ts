import rootRuducer from './reducers/index';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
// const epicMiddleware = createEpicMiddleware();

// const combineRootEpic = combineEpics(...rootEpic);
const combineRootReducer = combineReducers(rootRuducer);
// const store = createStore(combineRootReducer, applyMiddleware(epicMiddleware));

export const makeStore = (context: Context) => createStore(combineRootReducer);
// epicMiddleware.run(combineRootEpic);
// // export default store;
export const wrapper = createWrapper(makeStore, { debug: true });

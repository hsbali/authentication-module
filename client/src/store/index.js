import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducers from './reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

const middlewares = [thunk]

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(...middlewares)
  ));

export default store;
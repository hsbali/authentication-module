import { combineReducers } from 'redux';

// reducer import
import alert from './alert.reducer';
import auth from "./auth.reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    alert,
    auth,
});

export default reducer;

// src/redux/reducers/index.ts
import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // For type safety in selectors
export default rootReducer;

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import rootReducer from './reducers';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>; 
export type AppDispatch = typeof store.dispatch; 

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk) 
);

const persistor = persistStore(store);

export { store, persistor };

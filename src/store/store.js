import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//reducers are the use to create the state of the application

const persistConfig = {
	key: 'root',
	storage,
	blackList: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//! root-reducer
const middlewares = [];

const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;
// const composedEnhancers = compose(applyMiddleware(...middlewares));
const composedEnhancers = composeEnhancers(applyMiddleware(...middlewares));
// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

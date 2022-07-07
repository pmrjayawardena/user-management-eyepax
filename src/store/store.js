import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	blackList: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [];

const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '~/routes/history';
import rootReducer from './ducks';
import rootSaga from './sagas';

// criando o middleware
const sagaMiddleware = createSagaMiddleware();

// array de middlewares
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// salvando os reducers, e aplicando os middlewares
const store = createStore(rootReducer(history), applyMiddleware(...middlewares));

// rodando o middleware
sagaMiddleware.run(rootSaga);

export default store;

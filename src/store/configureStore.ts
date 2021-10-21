import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga as appSaga } from './rootSaga';
import { rootReducer } from './rootReducer';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
export const configureStore = () => {
    const logger = createLogger({ collapsed: true });
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(appSaga);
    return store;
};


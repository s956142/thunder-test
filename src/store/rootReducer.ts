import { combineReducers } from 'redux';
import { AssetsReducer } from './ducks';

export const rootReducer = combineReducers({
    assets: AssetsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

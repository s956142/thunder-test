import { takeEvery, put, all, call } from 'redux-saga/effects';
import { AssetsCreators, AssetsActionTypes, GetEventAction } from '../ducks';

function* getAssets() {
    // const data = yield call(fetch,'/userInfo',username)
    const res: any = yield call(() => fetchFn('/v1/assets?order_by=sale_count&limit=50'));
    yield put(AssetsCreators.getAssetsDone(res.assets));
}
function* getEvent({id,address}:GetEventAction) {
    // const data = yield call(fetch,'/userInfo',username)
  
    const res: any = yield call(() => fetchFn(`/v1/events?asset_contract_address=${address}&only_opensea=false&offset=0&limit=20`));
    yield put(AssetsCreators.getEventDone(id,res.asset_events));
}


const fetchFn = (uri:string) => {
    const domain = "https://api.opensea.io/api"
    return fetch(domain+uri)
      .then(res => res.json())
  };
export function* AppSaga() {
    yield all([
        takeEvery(AssetsActionTypes.GET_ASSETS,getAssets),
        takeEvery(AssetsActionTypes.GET_EVENT,getEvent),

    ])
}
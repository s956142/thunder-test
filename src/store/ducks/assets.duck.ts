import produce from 'immer';
import { IAssets, IEvent } from '~/domain'
const prefix = 'Assets';

export const AssetsActionTypes = {
  GET_ASSETS: `${prefix}/getAssets`,
  GET_ASSETS_DONE: `${prefix}/getAssetsDone`,
  GET_EVENT: `${prefix}/getEvent`,
  GET_EVENT_DONE: `${prefix}/getEventDone`,
  ADD_TO_WATCH_LIST: `${prefix}/addToWatchList`,
  REMOVE_FROM_WATCH_LIST: `${prefix}/removeFromWatchList`,
}

export interface GetAssetsAction {
  type: typeof AssetsActionTypes.GET_ASSETS
}
export interface GetAssetsDoneAction {
  type: typeof AssetsActionTypes.GET_ASSETS_DONE
  data: IAssets[]
}
export interface GetEventAction {
  type: typeof AssetsActionTypes.GET_EVENT
  id: number
  address:string
}
export interface GetEventDoneAction {
  type: typeof AssetsActionTypes.GET_EVENT_DONE
  id: number;
  data: IEvent[]
}
export interface AddToWatchListAction {
  type: typeof AssetsActionTypes.ADD_TO_WATCH_LIST
  data: IAssets
}
export interface RemoveFromWatchListAction {
  type: typeof AssetsActionTypes.REMOVE_FROM_WATCH_LIST
  id: number
}



type AssetsAction = GetAssetsAction |
GetAssetsDoneAction|
AddToWatchListAction|
RemoveFromWatchListAction|
GetEventAction|
GetEventDoneAction
export const AssetsCreators = {
  getAssets: (): AssetsAction => ({ type: AssetsActionTypes.GET_ASSETS }),
  getAssetsDone: (data: IAssets[]): AssetsAction => ({ type: AssetsActionTypes.GET_ASSETS_DONE, data }),
  getEvent: (id:number, address: string): AssetsAction => ({ type: AssetsActionTypes.GET_EVENT, id, address }),
  getEventDone: (id:number,data: IEvent[]): AssetsAction => ({ type: AssetsActionTypes.GET_EVENT_DONE,id, data }),
  addToWatchList: (data: IAssets): AssetsAction => ({ type: AssetsActionTypes.ADD_TO_WATCH_LIST, data }),
  removeFromWatchList: (id: number): AssetsAction => ({ type: AssetsActionTypes.REMOVE_FROM_WATCH_LIST, id }),
}
interface IStateType {
  assetsList: IAssets[]
  watchList: IAssets[]
  recordEvent: {
    [key:string]:IEvent[]
  }
}

const initState: IStateType = {
  assetsList:[],
  watchList:[],
  recordEvent:{}

}

export const AssetsReducer = produce((draft: IStateType, action: AssetsAction) => {
  switch (action.type) {
    case AssetsActionTypes.GET_ASSETS_DONE:{
      const data = (action as GetAssetsDoneAction).data;
      if (data) {
        draft.assetsList = data.sort((a,b)=>b.num_sales-a.num_sales)
      }
      return;
    }
    case AssetsActionTypes.GET_EVENT_DONE:{
      const {id, data} = (action as GetEventDoneAction);
      if (id && data) {
        draft.recordEvent[id] = data
      }
      return;
    }
    case AssetsActionTypes.ADD_TO_WATCH_LIST:{
      const data = (action as AddToWatchListAction).data;
      if (data) {
        const temp = JSON.parse(JSON.stringify(draft.watchList)) as IAssets[]
        if(!draft.watchList.find(x=>x.id===data.id)){
          temp.push(data)
          draft.watchList =temp.sort((a,b)=>b.num_sales-a.num_sales)
        }
      }
      return;
    }
    case AssetsActionTypes.REMOVE_FROM_WATCH_LIST:{
      const id = (action as RemoveFromWatchListAction).id;
      const temp = draft.watchList.find(x=>x.id===id)
      if (temp) {
        draft.watchList.splice( draft.watchList.indexOf(temp), 1);
      }
      return;
    }
  
  }
}, initState)
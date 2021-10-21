import { AreaCodeType } from "@tcg/xoso_web_core";

export interface BaseResponse<T> {
    rtnCode: string;
    rtnMessage: string;
    result: T | T[];
}
//for A2,A3,A4,A5,A6,A8
export interface ReqStreakDaySummary {
    streakdays?: string;
    querydays?: string;
    pairnumber?: string;
    page:number;
    limit:number;
}
export interface ResStreakDaySummary extends BaseResponse<SummaryGroup[]> {

}

export interface SummaryGroup {
    summaryGroupKey: string;
    bridgeGroupList: BridgeGroupList[];
}
export type SummaryList = StreakDaySummaryList
    | PositiveMatchSummaryList
    | ReverseMatchSummaryList
    | BothMatchSummaryList
    | MultiMatchSummaryList;

interface BridgeGroupList {
    groupKey: string;
    streakDaySummaryList: StreakDaySummaryList[];
    positiveMatchSummaryList?: PositiveMatchSummaryList[];
    reverseMatchSummaryList?: ReverseMatchSummaryList[];
    bothMatchSummaryList?: BothMatchSummaryList[];
    multiMatchSummaryList?: MultiMatchSummaryList[];
    timesSummaryList?: TimesSummaryList[];
    bridgeDetailList?: any;
}

interface StreakDaySummaryList {
    streakSummaryId: number;
    summaryDate: string;
    coordinate: string;
    currentNumber: string;
    streakDays: number;
    streakBridgeId: string;
    createTime: string;
    isLotto?: boolean;
    isSpecialPrize?: boolean;
}
interface PositiveMatchSummaryList {
    positiveSummaryId: number;
    summaryDate: string;
    coordinate: string;
    currentNumber: string;
    streakDays: number;
    streakBridgeId: string;
    createTime: string;
    isLotto: boolean;
    isSpecialPrize: boolean;
}
interface ReverseMatchSummaryList {
    reverseSummaryID: number;
    summaryDate: string;
    coordinate: string;
    currentNumber: string;
    streakDays: number;
    streakBridgeId: string;
    createTime: string;
    isLotto: boolean;
    isSpecialPrize: boolean;
}
interface BothMatchSummaryList {
    bothSummaryID: number;
    summaryDate: string;
    coordinate: string;
    currentNumber: string;
    streakDays: number;
    streakBridgeId: string;
    createTime: string;
    isLotto: boolean;
    isSpecialPrize: boolean;
}
interface MultiMatchSummaryList {
    multiSummaryID: number;
    summaryDate: string;
    coordinate: string;
    currentNumber: string;
    streakDays: number;
    streakBridgeId: string;
    createTime: string;
    isLotto: boolean;
    isSpecialPrize: boolean;
}
export interface TimesSummaryList {
    timesSummaryId: number;
    summaryDate: string;
    summaryNumber: string;
    times: number;
    streakSummaryId: string;
    createTime: string;
    isLotto: boolean;
    isSpecialPrize: boolean;
}

//end-------------------------------

//A7
export interface ReqBridgeDetail {
    BridgeIDList: string,
    //format DD-MM-YYYY
    PredictDate: string
}
export interface ResBridgeDetail extends BaseResponse<BridgeDetail> { }
export interface BridgeDetail {
    coordinate: string;
    drawAndWinList: DrawAndWinList[];
    drawPrediction: DrawPrediction;
}
export interface DrawPrediction {
    loto?: string;
    lotteryList?: LotteryList[];
    drawId: number;
    periodNo: string;
    drawDate: string;
    gameId: number;
    especially: string;
    firstPrize: string;
    secondPrize: string;
    thirdPrize: string;
    fourthPrize: string;
    fifthPrize: string;
    sixthPrize: string;
    seventhPrize: string;
    eighthPrize?:string;
    createTime: string;
}

export interface DrawAndWinList {
    loto: string;
    lotteryList: LotteryList[];
    drawId: number;
    periodNo: string;
    drawDate: string;
    gameId: number;
    especially: string;
    firstPrize: string;
    secondPrize: string;
    thirdPrize: string;
    fourthPrize: string;
    fifthPrize: string;
    sixthPrize: string;
    seventhPrize: string;
    createTime: string;
}

export interface LotteryList {
    awards: number;
    awardsGroup: number;
    lottoNumber: string;
}

//A10
export interface ReqTimesBridgeDetail {
    StreakSummaryIDList: string;
    PredictDate: string;
}
export interface ResTimesBridgeDetail extends BaseResponse<TimesBridgeDetail[]> { }
export interface TimesBridgeDetail {
    groupKey: string;
    streakDaySummaryList?: any;
    positiveMatchSummaryList?: any;
    reverseMatchSummaryList?: any;
    bothMatchSummaryList?: any;
    multiMatchSummaryList?: any;
    timesSummaryList?: any;
    bridgeDetailList: BridgeDetailList[];
}
export interface BridgeDetailList extends BridgeDetail { };
//A11
 
export interface ReqGetGamesByArea {
    areacode:AreaCodeType;
}
export interface ResGetGamesByArea extends BaseResponse<GetGamesByArea>{ 

}
export interface GetGamesByArea {
    today: Today[];
    history: Today[];
  }
  
  export interface Today {
    areaCode: AreaCodeType;
    gameID: number;
    drawDate: string;
    code: string;
    name: string;
  }
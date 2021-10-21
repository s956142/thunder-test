export interface IRouterMap {
    path: string; // 路由
    component: React.FunctionComponent; // 頁面組件
    exact?: boolean;
    auth?: boolean; // 是否需要登入驗證
    authRedirect?: string; // 已驗證時重新導向
    noAuthRedirect?: string; // 無驗證時重新導向
    redirectWithoutStateParamsPath?: string // 沒有state參數就要導向特定頁面
    oauthRedirect?: string // 三方綁定轉址
}


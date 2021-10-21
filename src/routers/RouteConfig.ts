import { lazy } from "react"
import { IRouterMap } from "~/domain"

/** 獨立頁面 */
export const RouteList: IRouterMap[] = [
  {
    path: '/',
    component: lazy(() => import('~/views/ListingPage')),
    exact:true
 },
  {
    path: "/listing-page",
    component: lazy(() => import("~/views/ListingPage"))
  },
  {
    path: "/watchlist-page",
    component: lazy(() => import("~/views/WatchListPage"))
  },

]

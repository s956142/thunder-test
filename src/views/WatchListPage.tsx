import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import '~/assets/scss/App.scss';
import AssetsView from '~/components/AssetsView';
import TitleComponent from '~/components/common/Title'
import { AssetsCreators, RootState } from '~/store';
import { IAssets } from '~/domain'
const InformationArea = ({ assetsList }: { assetsList: IAssets[] }) => {
    const recordEvent = useSelector((state: RootState) => state.assets.recordEvent);
   
    const sum = useMemo(() =>
        assetsList.reduce((a, b) => {
            if (recordEvent[b.id]) (
                a += recordEvent[b.id].reduce((c, d) => {
                    if (d.payment_token && d.payment_token.usd_price)
                        c += Number(d.payment_token.usd_price)
                    return c;
                }, 0)
            )
            return a;
        }, 0)
        , [assetsList, recordEvent])

    return (
        <div className="information-arrea">
            <h3>{`Total watched values: $ ${Number(assetsList.reduce((a, b) => a + Number(b.last_sale.payment_token.usd_price), 0)).toFixed(2)}(USD)`}</h3>
            <h3>{`Total watched assets sold price $${sum.toFixed(2)}(USD)`}</h3>
        </div>
    )

}
/** 取得分頁內容 */
const getAssetsByPage = (assetsList: IAssets[], size: number, index: number) => {
    return assetsList.slice(size * index, size * (index + 1))
}
/** 關注頁面 */
const WatchListPage = () => {
    const dispatch = useDispatch();
    const watchList = useSelector((state: RootState) => state.assets.watchList) as IAssets[];
    const [pageIndex, setPageIndex] = useState(0)
    const [pageContent, setPageContent] = useState<(IAssets & { isActive: boolean })[]>([])
    const PAGE_SIZE = 20;

    const onAssetsPress = (assets: IAssets) => dispatch(AssetsCreators.removeFromWatchList(assets.id))
    const viewParam = {
        redirectPath: "/listing-page",
        redirectBtn: "Go To List",
        assetsBtnWord: "Remove from Watchlist"
    }

    useEffect(() => {
        if (watchList) {
            setPageContent(getAssetsByPage(watchList, PAGE_SIZE, pageIndex).map(x => ({ ...x, isActive: false })))
        }
    }, [watchList, pageIndex])

    return (
        <div className="app-home">
            <div className="app-home-ct">
                <TitleComponent title={`Watchlist`} />
                <InformationArea assetsList={watchList} />
                <AssetsView
                    assetsList={pageContent}
                    type={2}
                    pageSize={Math.ceil(watchList.length / PAGE_SIZE)}
                    viewParam={viewParam}
                    onAssetsPress={onAssetsPress}
                    onPageChange={setPageIndex} />
            </div>
        </div>)
}
export default WatchListPage;
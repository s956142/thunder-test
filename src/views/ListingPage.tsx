import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '~/assets/scss/App.scss';
import AssetsView from '~/components/AssetsView';
import TitleComponent from '~/components/common/Title'
import { AssetsCreators, RootState } from '~/store';
import { IAssets } from '~/domain'
/** 取得分頁內容 */
const getAssetsByPage = (assetsList: IAssets[], size: number, index: number) => {
    return assetsList.slice(size * index, size * (index + 1))
}
/** 列表頁面 */
const ListingPage = () => {
    const dispatch = useDispatch();
    const assetsList = useSelector((state: RootState) => state.assets.assetsList) as IAssets[];
    const watchList = useSelector((state: RootState) => state.assets.watchList) as IAssets[];
    const [pageIndex, setPageIndex] = useState(0)
    const [pageContent, setPageContent] = useState<(IAssets & { isActive: boolean })[]>([])
    const [watchIds, setWatchIds] = useState<number[]>([])
    const PAGE_SIZE = 20;

    const onAssetsPress = (assets: IAssets) => {

        dispatch(AssetsCreators.addToWatchList(assets))
        dispatch(AssetsCreators.getEvent(assets.id, assets.asset_contract.address))

    }
    const viewParam = {
        redirectPath: "/watchlist-page",
        redirectBtn: "Go To WatchList",
        assetsBtnWord:"Add to Watchlist"
    }
    useEffect(() => {
        dispatch(AssetsCreators.getAssets())
    }, [])
    useEffect(() => {
        if (assetsList) {
            setPageContent(
                getAssetsByPage(assetsList, PAGE_SIZE, pageIndex).map(x => ({
                    ...x,
                    isActive: watchIds.indexOf(x.id) !== -1
                }))
            )

        }
    }, [assetsList, pageIndex,watchIds])
    useEffect(() => {
        if (watchList) {
            setWatchIds(watchList.map(x => x.id))
        }
    }, [watchList])

    return (
        <div className="app-home">
            <div className="app-home-ct">
                <TitleComponent title={`NFTs`} />
                <AssetsView
                    assetsList={pageContent}
                    type={1}
                    pageSize={Math.ceil(assetsList.length / PAGE_SIZE)}
                    viewParam={viewParam}
                    onAssetsPress={onAssetsPress}
                    onPageChange={setPageIndex} />
            </div>
        </div>)
}
export default ListingPage;
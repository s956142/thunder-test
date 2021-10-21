import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { IAssets } from "~/domain"
import Pagination from '~/components/common/Pagination'
import AssetsCard from '~/components/AssetsCard'
type assetsViewTypes = 1 | 2 // 1:列表 2: 關注
type propsType = {
  assetsList: (IAssets & { isActive: boolean })[]
  type: assetsViewTypes
  pageSize: number
  viewParam:{
    redirectPath:string
    redirectBtn:string
    assetsBtnWord:string
  }
  onAssetsPress: (assets:IAssets) => void
  onPageChange: (page:number) => void
}

const AssetsView = (props: propsType) => {
  const [pageIndex, setPageIndex] = useState(0)
  const history = useHistory();
  const onPagePress = (index:number) =>{
    setPageIndex(index)
    props.onPageChange(index)
  }
  return (
    <div className="assets-view">
      <div className="assets-area">
        {
          props.assetsList.map((assets, index) => (
            <AssetsCard showLastPrice={props.type==2} btnWord={props.viewParam.assetsBtnWord} key={`assets_${index}`} isActive={assets.isActive} data={assets} onPress={()=>props.onAssetsPress(assets)} />
          ))
        }
      </div>
      <div className="pageination-area">
        <Pagination size={props.pageSize} index={pageIndex} onPress={onPagePress} />
        <button className={"navigator-btn"} onClick={() => history.push(props.viewParam.redirectPath)}>{props.viewParam.redirectBtn}</button>
      </div>
    </div>
  );
};

export default AssetsView
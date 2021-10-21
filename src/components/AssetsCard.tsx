import React from 'react';
import { IAssets } from "~/domain"

const ImageSet = ({ image }: { image: string }) => (
  <div className="image-area">
    <img src={image} />
  </div>
)
const CardInfo = ({ name, number, address, lastPrice }: { name: string, number: number, address: string, lastPrice?:string }) => {
  return (
    <div className={"card-info"}>
      <div className={"row"}>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <div className={"row"}>
        {address}
      </div>
      <div className={"row"}>
        {lastPrice?`last price $${Number(lastPrice).toFixed(2)}`:''}
      </div>

    </div>
  )
}
const BottomBtn = ({ text, onPress }: { text: string, onPress: () => void }) => {
  return (
    <div className={"add-btn"} onClick={onPress}>
      {text}
    </div>
  )
}
const AssetsCard = ({ data, isActive, btnWord, showLastPrice, onPress }: { data: IAssets, isActive: boolean, btnWord:string, showLastPrice:boolean, onPress: () => void }) => {
 
  return (
    <div className="assets-card">
      <ImageSet image={data.image_url} />
      <CardInfo name={data.name} number={data.num_sales} address={data.asset_contract.address} lastPrice={showLastPrice?data.last_sale.payment_token.usd_price:undefined} />
      <div className={`bottom-area ${isActive ? 'isActive' : ''}`}>
        <BottomBtn text={isActive?"Selected":btnWord} onPress={onPress} />
      </div>
    </div>
  );
};

export default AssetsCard
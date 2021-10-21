export interface IAsset_contract {
  address: string;
  asset_contract_type: string;
  created_date: string;
  name: string;
}
export interface IAssets {
  id: number;
  token_id: string;
  num_sales: number;
  image_url: string;
  image_preview_url: string;
  name: string;
  description: string;
  asset_contract: IAsset_contract;
  last_sale: {
    payment_token: {
      usd_price: string;
    };
  };
}
export interface IEvent {
  asset: {
    id: number;
    token_id: string;
  };
  payment_token: {
    usd_price: string;
  };
}

import { SHOP_ID_HEADER } from '@/constants';
import { inspect } from 'util';

export const getShopIdH = (headers: Headers) => headers[SHOP_ID_HEADER];
export const log = (data: any) => console.log(inspect(data, false, 100, true));
export const getPropertyNameOf = <TObj>(name: keyof TObj) => {
  return name;
};

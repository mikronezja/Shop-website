import { BasicProductInfo } from "../components/Types/ProductTypes";

export interface BasketContextType {
  cartItems: BasicProductInfo[];
  setCartItems: React.Dispatch<React.SetStateAction<BasicProductInfo[]>>;
}

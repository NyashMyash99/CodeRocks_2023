import { Currency } from "../constants/currency.constants";
import { UserModel } from "./users.models";

export interface OrderModel {
  id: string;
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  currency: Currency;
  deadline: number;
  location: string;
  customer: UserModel;
  performers: UserModel[];
}

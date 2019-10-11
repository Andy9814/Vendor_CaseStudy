import { PurchaseorderItem } from './purchaseorder-item';

export interface Purchaseorder {
    id: number;
    vendorid: number;
    amount: number;
    items: PurchaseorderItem[];
    poDate?: Date;

}
import { Item } from './item';

export interface Rental {
    id: number;
    ownerName: string;
    userName: string;
    itemId: number;
    itemName: string;
    rentalDate: string;
    confirmedDate: string;
    returnDate: string;
    rentalPeriod: number;
    item?: Item;
  }

  
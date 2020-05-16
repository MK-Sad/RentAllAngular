import { Item } from './item';

export interface Rental {
    id: number;
    userName: string;
    itemId: number;
    rentalDate: string;
    returnDate: string;
    rentalPeriod: number;
    item?: Item;
  }

  
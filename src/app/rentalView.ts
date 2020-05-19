import { Rental } from './rental';
import { Item } from './item';

export class RentalView implements Rental {
    id: number;
    ownerName: string;
    userName: string;
    itemId: number;
    rentalDate: string;
    confirmedDate: string;
    returnDate: string;
    rentalPeriod: number;
    daysLeft: number;
    item: Item;

    constructor(rental: Rental, item: Item, today: number) {
        this.id = rental.id;
        this.userName = rental.userName;
        this.ownerName = rental.ownerName;
        this.itemId = rental.itemId;
        this.rentalDate = rental.rentalDate;
        this.confirmedDate = rental.confirmedDate;
        this.returnDate = rental.returnDate;
        this.rentalPeriod = rental.rentalPeriod;
        this.item = item;
        this.daysLeft = this.diff(rental.rentalDate, rental.rentalPeriod, today);
    }

    diff(rentalDate: string, rentalPeriod: number, today: number): number {
        return rentalPeriod - Math.floor((today - Date.parse(rentalDate) ) / 86400000); 
      }
}
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  constructor(private itemService: ItemService, private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentalsByUserName();
  }

  rentals: Rental[];
  loggedUserName: string = "Robert";
  currentDate = new Date();

  getRentalsByUserName(): void {
    this.rentalService.searchRentalsByUserName(this.loggedUserName)
      .subscribe(rentals => {
        rentals.map(rental => {
          this.getItemByRental(rental)
        });
        this.rentals = rentals;
      }
      );
  }

  getItemByRental(rental: Rental): void {
    this.itemService.getItem(rental.itemId)
      .subscribe(item => 
        rental['item'] = item
      );
  }

  diff(rentalDate: string): number {
    return Math.floor(( Number(this.currentDate) - Date.parse(rentalDate) ) / 86400000); 
  }

  //localStorage.setItem(key, value);

}

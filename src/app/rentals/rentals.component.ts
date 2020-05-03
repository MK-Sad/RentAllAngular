import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';
import { UserNameService } from '../userName.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  private _subscription_userName: any;
  loggedUserName: string;
  rentals: Rental[];
  currentDate:number = Number(new Date());

  constructor(private itemService: ItemService, private rentalService: RentalService, private userNameService : UserNameService) {
    this._subscription_userName = this.userNameService.execChange.subscribe((value) => {
        this.loggedUserName = value;
        this.getRentalsByUserName();
    });
   }

  ngOnInit(): void {
    this.getRentalsByUserName();
  }

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

  diff(rentalDate: string, rentalPeriod: number): number {
    return rentalPeriod - Math.floor((this.currentDate - Date.parse(rentalDate) ) / 86400000); 
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

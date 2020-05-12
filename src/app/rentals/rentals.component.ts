import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { RentalView } from '../rentalView';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';
import { ShareService } from '../share.service';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit, OnDestroy {

  private _subscription_userName: any;
  private _subscription_rentalAdded: any;
  loggedUserName: string;
  rentals: Rental[];
  currentDate:number = Number(new Date());

  constructor(private itemService: ItemService, private rentalService: RentalService, private shareService : ShareService) {
    this._subscription_userName = this.shareService.userChange.subscribe((value) => {
        this.loggedUserName = value;
        this.getRentalsByUserName();
    });
    this._subscription_rentalAdded = this.shareService.rentalAdded.subscribe((value) => {
      this.rentals.push(value);
    });
   }

  ngOnInit(): void {
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
    this._subscription_rentalAdded.unsubscribe();
  }

}

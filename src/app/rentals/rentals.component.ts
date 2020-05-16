import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';
import { ShareService } from '../share.service';
import { Observable, forkJoin } from 'rxjs';

type MapOfItems = {
  [x: number]: Item;
}

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit, OnDestroy {

  private _subscription_userName: any;
  private _subscription_rentalAdded: any;
  loggedUserName: string;
  rentals: Rental[] = [];
  currentDate: number = Date.now();

  constructor(private itemService: ItemService, private rentalService: RentalService, private shareService: ShareService) {
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
        const result = this.callForItems(rentals);
        forkJoin(result).subscribe(items => {
          const mapOfItems = this.mapOfItems(items);
          rentals.map(rental => {
            const item = mapOfItems[rental.itemId];
            if (item) {
              rental.item = item;
            }
          })
          this.rentals = rentals;
        });
      }
      );
  }

  private mapOfItems(items: Item[]): MapOfItems {
    return items.reduce((map: MapOfItems, item) => {
      map[item.id] = item;
      return map;
    }, {});
  }

  private callForItems(rentals: Rental[]): Observable<Item>[] {
    return rentals.map(rental => this.itemService.getItem(rental.itemId));
  }

  diff(rentalDate: string, rentalPeriod: number): number {
    return rentalPeriod - Math.floor((this.currentDate - Date.parse(rentalDate)) / 86400000);
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
    this._subscription_rentalAdded.unsubscribe();
  }

}

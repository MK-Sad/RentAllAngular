import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ShareService } from '../share.service';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { RentalService } from '../rental.service';
import { forkJoin } from 'rxjs';
import { Rental } from '../rental';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit, OnDestroy {

  popUpOpen: boolean = false;
  popUpItem: Item;
  popUpIndex: number;
  private _subscription_userName: any;
  loggedUserName: string;
  items: Item[] = [];
  rentals: Rental[] = [];
  theBoundCallback: Function;


  constructor(private itemService: ItemService, private rentalService: RentalService, private shareService : ShareService) {
    this._subscription_userName = this.shareService.userChange.subscribe((value) => {
        this.onUserNameChange(value);
    });
   }

  ngOnInit(): void {
    this.theBoundCallback = this.theCallback.bind(this);
  }

  onUserNameChange(newUserName: string) : void {
    this.loggedUserName = newUserName;
    if (newUserName != null) {
      //this.getItemsByOwnerName(this.loggedUserName);
      this.getItemsAndRentalsByOwnerName(this.loggedUserName);
    } else {
      this.items = [];
    }
  }

  public theCallback(item: Item){
    this.popUpOpen = false;
    if (item != null) {
      const id = this.popUpItem.id;
      this.itemService.updateItem(item)
      .subscribe(item => {
        if (this.popUpIndex != null) {
          this.items[this.popUpIndex] = item;
        } else {
          this.items.push(item);
        }});
    }
  }

  getItemsByOwnerName(ownerName: string): void {
    this.itemService.searchItemsByOwner(ownerName)
      .subscribe(items => this.items = items);
  }

  getItemsAndRentalsByOwnerName(ownerName: string): void {
    let items = this.itemService.searchItemsByOwner(ownerName);
    let rentals = this.rentalService.searchRentalsByOwnerName(ownerName);
    forkJoin([items, rentals])
      //.pipe(map(data => data.reduce((result,arr)=>[...result,...arr],[])))
      .subscribe(result =>{
        this.items = result[0];
        this.rentals = result[1];
        console.log(this.rentals);
        this.items.forEach(item => {
          this.rentals.forEach(rental => {
            if (rental.itemId == item.id) {
              item.rental = rental;
            }})
        })
      }
    )
  }

  itemReturned(item : Item) {
    this.itemService.returnItem(item.id)
      .subscribe(rental => {
        item.rental = undefined;
        item.rented = false;
      });
  }

  confirmRental(item : Item) {
    this.rentalService.confirmRental(item.rental)
      .subscribe(rental => {
        item.rental = rental;
        item.rented = true;
      });
  }

  denyRental(item : Item) {
    this.rentalService.denyRental(item.rental)
      .subscribe(rental => {
        item.rental = undefined;
        item.rented = false;
      });
  }

  changeAvailable(item: Item) : void {
    this.itemService.updateItem(item)
    .subscribe(item => {});
    //TODO right panel refresh
  }

  openAddItem() : void {
    this.popUpItem = {
      id: null,
      name: null,
      category: null,
      rentalPeriod: 1,
      owner: this.loggedUserName,
      description: null,
      imageName: null,
      available: false,
      rented: false
    };
    this.popUpOpen = true;
    this.popUpIndex = null;
  }

  openEditItem(item: Item, index: number) : void {
    this.popUpItem = Object.assign({}, item);
    this.popUpIndex = index;
    this.popUpOpen = true;
  }

  period(days: number): string {
    if (days<2) {
      return "1 day";
    } else {
      return days + " days";
    }
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

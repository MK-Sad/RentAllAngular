import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { UserNameService } from '../userName.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit, OnDestroy {

  private _subscription_userName: any;
  loggedUserName: string;
  items: Item[];

  constructor(private itemService: ItemService, private userNameService : UserNameService) {
    this._subscription_userName = this.userNameService.execChange.subscribe((value) => {
        this.loggedUserName = value;
        this.getItemsByOwnerName(this.loggedUserName);
    });
   }

  ngOnInit(): void {
  }

  getItemsByOwnerName(ownerName: string): void {
    this.itemService.searchItemsByOwner(ownerName)
      .subscribe(items => this.items = items);
  }

  itemReturned(item : Item) {
    this.itemService.returnItem(item.id)
      .subscribe(rental => {
        item.rented = false;
      });
  } 

  changeAvailable(item: Item) : void {
    this.itemService.updateItem(item)
    .subscribe(item => {});
    //TODO right panel refresh
  }

  openAddItem(item: Item) : void {
    console.log("New item");
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

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

  popUpOpen: boolean = false;
  popUpItem: Item;
  popUpIndex: number;
  private _subscription_userName: any;
  loggedUserName: string;
  items: Item[];
  theBoundCallback: Function;


  constructor(private itemService: ItemService, private userNameService : UserNameService) {
    this._subscription_userName = this.userNameService.execChange.subscribe((value) => {
        this.loggedUserName = value;
        this.getItemsByOwnerName(this.loggedUserName);
    });
   }

  ngOnInit(): void {
    this.theBoundCallback = this.theCallback.bind(this);
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

  openAddItem() : void {
    this.popUpItem = {
      id: null,
      name: null,
      category: null,
      owner: this.loggedUserName,
      description: null,
      available: false,
      rented: false
    };
    this.popUpOpen = true;
    this.popUpIndex = null;
  }

  openEditItem(item: Item, index: number) : void {
    this.popUpItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      owner: this.loggedUserName,
      description: item.description,
      available: false,
      rented: false
    };
    this.popUpOpen = true;
    this.popUpIndex = index;
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

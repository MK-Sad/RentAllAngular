import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  private _subscription_userName: any;
  loggedUserName: string;
  items: Item[];
  categories: string[];
  namePart: string;
  selectedCategory: string;

  constructor(private itemService: ItemService, private rentalService: RentalService, public shareService : ShareService) {
    this._subscription_userName = this.shareService.userChange.subscribe((value) => {
      this.onUserNameChange(value);
    });
   }

  onUserNameChange(newUserName: string) : void {
    this.loggedUserName = newUserName;
    if (newUserName != null) {
      this.selectedCategory = "TOOLS";
      this.getItemsByCategory();
    } else {
      this.items = [];
    }
  } 

  ngOnInit(): void {
    this.getCategories();
    this.selectedCategory = "TOOLS";
    this.getItemsByCategory();
  }

  getItemsByCategory(): void {
    this.shareService.loader = true;
    this.itemService.searchItemsByCategory(this.selectedCategory)
      .subscribe(items => {
        this.shareService.loader = false;
        this.items = items
      });
  }

  getCategories(): void {
    this.itemService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  changeCategory(): void {
    this.getItemsByCategory();
  }

  searchByNamePart(): void {
    if (this.namePart.length > 2) {
      this.selectedCategory = null;
      this.itemService.searchItemsByNamePart(this.namePart)
      .subscribe(items => this.items = items);
    }
  }

  rentIt(item: Item): void {
    this.shareService.loader = true;
    var rental: Rental = { 
      id: null,
      userName: this.loggedUserName,
      ownerName: item.owner,
      itemId: item.id,
      itemName: item.name,
      rentalDate: null,
      confirmedDate: null,
      returnDate: null,
      rentalPeriod: item.rentalPeriod };
    this.rentalService.addRental(rental)
      .subscribe(rental => {
        rental.item = item;
        this.removeItem(item);
        this.shareService.rentalAdd(rental);
        this.shareService.loader = false;
      });
  }

  removeItem(item: Item){
    const index: number = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

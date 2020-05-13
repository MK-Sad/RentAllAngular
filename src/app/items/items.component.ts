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

  constructor(private itemService: ItemService, private rentalService: RentalService, private shareService : ShareService) {
    this._subscription_userName = this.shareService.userChange.subscribe((value) => {
        this.loggedUserName = value;
        this.getItemsByCategory();
    });
   }

  ngOnInit(): void {
    this.getCategories();
    this.selectedCategory = "TOOLS";
    this.getItemsByCategory();
  }

  getItemsByCategory(): void {
    this.itemService.searchItemsByCategory(this.selectedCategory)
      .subscribe(items => this.items = items);
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
    var rental: Rental = { 
      id: null,
      userName: this.loggedUserName,
      itemId: item.id,
      rentalDate: null,
      returnDate: null,
      rentalPeriod: item.rentalPeriod };
    this.rentalService.addRental(rental)
      .subscribe(rental => {
        rental['item'] = item;
        this.removeItem(item);
        this.shareService.rentalAdd(rental);
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

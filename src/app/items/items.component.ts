import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';
import { UserNameService } from '../userName.service';

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
  category: string;
  selectedCategory: string;

  constructor(private itemService: ItemService, private rentalService: RentalService, private userNameService : UserNameService) {
    this._subscription_userName = this.userNameService.execChange.subscribe((value) => {
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

  rentIt(event, item: Item): void {
    var rental: Rental = { 
      id: null,
      userName: this.loggedUserName,
      itemId: item.id,
      rentalDate: null,
      returnDate: null,
      rentalPeriod: item.rentalPeriod };
    this.rentalService.addRental(rental)
      .subscribe(rental => {console.log("Rental has been saved: " + rental.id)});
  }

  ngOnDestroy(): void {
    this._subscription_userName.unsubscribe();
  }

}

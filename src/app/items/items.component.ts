import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  categories: string[];
  category: string;
  selectedCategory: string;

  constructor(private itemService: ItemService, private rentalService: RentalService) { }

  getItemsByCategory(category: string): void {
    this.itemService.searchItemsByCategory(category)
      .subscribe(items => this.items = items);
  }

  getCategories(): void {
    this.itemService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  changeCategory(): void {
    this.getItemsByCategory(this.selectedCategory);
  }

  rentIt(event, item: Item): void {
    var rental: Rental = { 
      id: null,
      userName: "Robert",
      itemId: item.id,
      rentalDate: null,
      returnDate: null,
      rentalPeriod: 3 };
    this.rentalService.addRental(rental)
      .subscribe(rental => {console.log("Rental has been saved: " + rental.id)});
  }

  ngOnInit(): void {
    this.getCategories();
    this.selectedCategory = "TOOLS";
    this.getItemsByCategory(this.selectedCategory);
  }

}

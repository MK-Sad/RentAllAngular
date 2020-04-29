import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ItemService } from '../item.service';

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

  constructor(private itemService: ItemService) { }

  //test, not used now
  item: Item = {
    id: 1,
    name: "Wiertarka",
    category: "TOOLS",
    owner: "Robert",
    description: "popsuta",
    available: true,
    rented: false
  }

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

  ngOnInit(): void {
    this.getCategories();
    this.selectedCategory = "TOOLS";
    this.getItemsByCategory(this.selectedCategory);
  }

}

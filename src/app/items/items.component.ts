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

  constructor(private itemService: ItemService) { }

  item: Item = {
    id: 1,
    name: "Wiertarka",
    category: "TOOLS",
    owner: "Robert",
    description: "popsuta",
    available: true,
    rented: false
  }

  getItemsByCategory(): void {
    const category = "TOOLS";
    this.itemService.searchItemsByCategory(category)
      .subscribe(items => this.items = items);
  }

  getItems(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items);
  }



  ngOnInit(): void {
    this.getItemsByCategory();
  }

}

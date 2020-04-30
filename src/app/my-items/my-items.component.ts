import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {

  loggerUserName: string = "Robert";
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItemsByOwnerName("Robert");
  }

  getItemsByOwnerName(ownerName: string): void {
    this.itemService.searchItemsByOwner(ownerName)
      .subscribe(items => this.items = items);
  }

  changeAvailable(item: Item) : void {
    this.itemService.updateItem(item)
    .subscribe(item => {});
    //TODO right panel refresh
  }

}

import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {

  @Input('popUpOpen') popUpOpen: boolean;
  @Input('popUpItem') popUpItem: Item;

  categories: string[];
  private element: any;
  
  constructor(private itemService: ItemService, private el: ElementRef) {
    this.element = el.nativeElement;
   }

  ngOnInit(): void {
    this.getCategories();
    document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'jw-modal') {
                this.closePopup();
            }
        });
  }

  saveItem(){
    this.popUpOpen = false;
  }

  closePopup(){
    this.popUpOpen = false;
  }

  getCategories(): void {
    this.itemService.getCategories()
    .subscribe(categories => this.categories = categories);
    console.log(this.popUpItem.name);
  }
}

import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/item.service';
import { ShareService } from 'src/app/share.service';

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {

  @Input() popUpOpen: boolean;
  @Input() popUpItem: Item;
  @Input() myCallback: Function; 

  categories: string[];
  private element: any;
  private noImageURL: string = this.shareService.homeUrl + "/images/noImage.png";
  
  constructor(private itemService: ItemService, public shareService: ShareService, private el: ElementRef) {
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
    this.myCallback(this.popUpItem);
  }

  closePopup(){
    this.popUpOpen = false;
    this.myCallback(null);
  }

  getCategories(): void {
    this.itemService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  changeImg(event: any): void{
    event.target.src = this.noImageURL;
  }
}

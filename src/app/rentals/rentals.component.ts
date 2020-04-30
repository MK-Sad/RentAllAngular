import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Rental } from '../rental';
import { ItemService } from '../item.service';
import { RentalService } from '../rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  constructor(private itemService: ItemService, private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentalsByUserName();
  }

  rentals: Rental[];
  loggedUserName: string = "Robert";

  getRentalsByUserName(): void {
    this.rentalService.searchRentalsByUserName(this.loggedUserName)
      .subscribe(rentals => this.rentals = rentals);
  }

  //localStorage.setItem(key, value);

}

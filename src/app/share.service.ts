import {Injectable}             from '@angular/core';
import {Subject}                from 'rxjs';
import { Rental } from './rental';

@Injectable()
export class ShareService {

    homeUrl = 'http://localhost:8080';  //'https://rentall-app.herokuapp.com'; //'http://localhost:8080';
    loader:boolean = false;
    categories: string[] = [];

    userChange: Subject<any> = new Subject<any>();
    rentalAdded: Subject<any> = new Subject<any>();

    constructor() {}

    userNameChange(userName: string) {
        this.userChange.next(userName);
    }

    rentalAdd(rental: Rental) {
        this.rentalAdded.next(rental);
    }
}
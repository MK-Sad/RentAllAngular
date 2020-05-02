import {Injectable}             from '@angular/core';
import {Subject}                from 'rxjs';

@Injectable()
export class UserNameService {

    execChange: Subject<any> = new Subject<any>();

    constructor() {}

    userNameChange(data: string) {
        this.execChange.next(data);
    }
}
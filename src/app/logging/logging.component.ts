import { Component, OnInit } from '@angular/core';
import { UserNameService } from '../userName.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private userNameService: UserNameService) {}

  loggedUserName: string;

  changeUserName(): void {
    this.userNameService.userNameChange(this.loggedUserName);
  }

  ngOnInit(): void {
  }

}

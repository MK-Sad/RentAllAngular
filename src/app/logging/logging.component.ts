import { Component, OnInit } from '@angular/core';
import { UserNameService } from '../userName.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private userNameService: UserNameService) {}

  changeUserName(name: string): void {
    this.userNameService.userNameChange("Robert");
  }

  ngOnInit(): void {
    this.changeUserName("Robert")
  }

}

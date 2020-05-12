import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private shareService: ShareService) {}

  loggedUserName: string;

  changeUserName(): void {
    this.shareService.userNameChange(this.loggedUserName);
  }

  ngOnInit(): void {
  }

}

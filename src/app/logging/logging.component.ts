import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { UserCredentials } from '../userCredentials';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private userService: UserService, private shareService: ShareService) {}

  loggedUserName: string;
  userPoints: number;
  userCredentials: UserCredentials;
  background_graty: string = this.shareService.homeUrl + '/images/tlo_logowanie1.jpg';
  hands: string = this.shareService.homeUrl + '/images/shaking-hands.jpg';
  logo: string = this.shareService.homeUrl + '/images/logo.png';

  changeUserName(): void {
    this.shareService.userNameChange(this.loggedUserName);
  }

  ngOnInit(): void {
  }

  logout() {
    this.loggedUserName = null;
    this.changeUserName();
  }

  login(formData: NgForm) {
    const userCredentials: UserCredentials = { "name": formData.value.name, "password": formData.value.password };
    this.userService
      .authenticate(userCredentials)
      .subscribe(userPoints => {
        this.loggedUserName = userPoints.name;
        this.userPoints = userPoints.points;
        this.changeUserName();
      });
  }

}
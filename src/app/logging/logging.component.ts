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
  userCredentials: UserCredentials;
  background_graty: string = this.shareService.homeUrl + '/images/graty.jpg';
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
      .subscribe(userCredentialLogged => {
        this.loggedUserName = userCredentialLogged.name;
        this.changeUserName();
      });
  }

}

/*Piotr
import { Component, OnInit } from ‘@angular/core’;
import { AuthService } from ‘../auth.service’;
import { NgForm } from ‘@angular/forms’;
import { User } from ‘src/app/user’;
@Component({
  selector: ‘app-login’,
  templateUrl: ‘./login.component.html’,
  styleUrls: [‘./login.component.css’],
})
export class LoginComponent {
  users = new Array<User>();
  constructor(private authService: AuthService) {}
  uzytkownik: User;
  login(formData: NgForm) {
    this.authService
      .loginUser(formData.value.name, formData.value.password)
      .subscribe((users) => {
        this.uzytkownik = users;
      });
  }
}
*/
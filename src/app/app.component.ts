import { Component } from '@angular/core';
import { ShareService } from './share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private shareService: ShareService) {}

  title = 'RentAll';
  background: string = this.shareService.homeUrl + '/images/background.jpg';
  logo: string = this.shareService.homeUrl + '/images/logo_transparent.png';
}

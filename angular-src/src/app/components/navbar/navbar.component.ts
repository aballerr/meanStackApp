import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {

  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}

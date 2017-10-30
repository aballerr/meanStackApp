import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }


  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Login successful!', {cssClass: 'alert-success', timeout: 3000});
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['']);

      } else {
        this.flashMessage.show('Login failed:  Either incorrect username or password', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }

}

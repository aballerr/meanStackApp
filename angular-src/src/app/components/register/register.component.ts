import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit() {
  }



  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the fields', {cssClass: 'alert-danger', timeout: 3000});

      return false;
    }
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(
      data => {
        if (data.success){
          this.flashMessage.show('You are now registered', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        }
        else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/register']);

        }
      }
    );


  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private router: Router, private authService: AuthserviceService) {


   }

  ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
          console.log(err);
          return false;
      });
  }

}

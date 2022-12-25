import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['/login']),
      error => {console.warn(error)}
    )
  }

  ngOnInit(): void {
  }

}

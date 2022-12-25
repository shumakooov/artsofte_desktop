import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Observable} from "rxjs";
import {Profile} from "../../interfaces";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  profileInfo$: Observable<Profile>

  ngOnInit(): void {
    this.profileInfo$ = this.profileService.getProfileInfo()
  }

}

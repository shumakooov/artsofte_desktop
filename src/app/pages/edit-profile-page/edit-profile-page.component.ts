import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from "../../services/profile.service";
import {TuiAlertService} from "@taiga-ui/core";
import {Observable} from "rxjs";
import {Profile} from "../../interfaces";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {
  API_URL = environment.API_URL

  profileForm: FormGroup
  profileInfo$: Observable<Profile>

  constructor(private profileService: ProfileService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      secondname: new FormControl(null, [Validators.required]),
      connectLink: new FormControl(null, [Validators.required]),
    })

    this.profileInfo$ = this.profileService.getProfileInfo()
  }

  edit(){
    this.profileService.setProfileImage(this.formData).subscribe()

    this.profileService.editProfile(this.profileForm.value).subscribe(
      () => {
        this.router.navigate(['/profile'])
        },
      error => {
        this.alertService.open(error.error.message).subscribe();
      })
  }


  fileName = '';
  formData = new FormData()

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.formData.append("file", file);
    }
  }
}

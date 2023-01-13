import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiAlertService} from '@taiga-ui/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  authForm: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberme: new FormControl(false)
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  login() {
    const user = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
      rememberme: this.authForm.value.rememberme
    }
    this.aSub = this.auth.login(user).subscribe(
      () => this.router.navigate(['/devices']),
      error => {
        this.alertService.open(error.error.message).subscribe();
      }
    )
  }
}

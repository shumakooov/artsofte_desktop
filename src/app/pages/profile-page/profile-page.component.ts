import {AfterContentInit, Component, Inject, Injector, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TuiDialogService} from "@taiga-ui/core";
import {Observable} from "rxjs";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {DeviceProblemComponent} from "../../components/device-problem/device-problem.component";
import {BookingHistoryComponent} from "../../components/booking-history/booking-history.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements AfterContentInit {
  dialogBookingHistory: Observable<number>
  dialogDeviceProblem: Observable<number>
  mediaQuery: any = window.matchMedia("(max-width:480px)")
  constructor(private router: Router,
              private auth: AuthService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) { }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['/login']),
      error => {console.warn(error)}
    )
  }

  ngAfterContentInit() {
    if (this.mediaQuery.matches) {
      this.dialogDeviceProblem = this.dialogService.open<number>(
        new PolymorpheusComponent(DeviceProblemComponent, this.injector),
        {
          size: "fullscreen"
        }
      );
      this.dialogBookingHistory = this.dialogService.open<number>(
        new PolymorpheusComponent(BookingHistoryComponent, this.injector),
        {
          size: "fullscreen"
        }
      );
    } else {
      this.dialogDeviceProblem = this.dialogService.open<number>(
        new PolymorpheusComponent(DeviceProblemComponent, this.injector),
        {
          size: "auto"
        }
      );
      this.dialogBookingHistory = this.dialogService.open<number>(
        new PolymorpheusComponent(BookingHistoryComponent, this.injector),
        {
          size: "auto"
        }
      );
    }
  }

  showBookingHistory(): void {
    this.dialogBookingHistory.subscribe();
  }

  showDeviceProblem(): void {
    this.dialogDeviceProblem.subscribe();
  }
}

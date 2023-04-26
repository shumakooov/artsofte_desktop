import {Component, ChangeDetectionStrategy, Inject, Injector, Input, AfterContentInit} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ModalDeviceCardComponent} from "../modal-windows/modal-device-card/modal-device-card.component";
import {Observable} from "rxjs";
import {ModalBookingCardComponent} from "../modal-windows/modal-booking-card/modal-booking-card.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements AfterContentInit {
  API_URL = environment.API_URL
  @Input() imgUrl: string;
  @Input() deviceName: string;
  @Input() os: string;
  @Input() diagonal: number;
  @Input() department: string;
  @Input() id: number;

  mediaQuery: any = window.matchMedia("(max-width:480px)")

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) {
  }

  dialogBookingCard: Observable<number>
  dialogDeviceCard: Observable<number>

  ngAfterContentInit() {
    if (this.mediaQuery.matches) {
      this.dialogDeviceCard = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalDeviceCardComponent, this.injector),
        {
          data: this.id,
          size: "fullscreen"
        }
      );
    } else {
      this.dialogDeviceCard = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalDeviceCardComponent, this.injector),
        {
          data: this.id,
          size: "auto"
        }
      );
    }
    if (this.mediaQuery.matches) {
      this.dialogBookingCard = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalBookingCardComponent, this.injector),
        {
          data: this.id,
          size: "fullscreen"
        }
      );
    } else {
      this.dialogBookingCard = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalBookingCardComponent, this.injector),
        {
          data: this.id,
          size: "auto"
        }
      );
    }
  }

  showDeviceCard(): void {
    this.dialogDeviceCard.subscribe();
  }

  showBookingCard(): void {
    this.dialogBookingCard.subscribe();
  }
}

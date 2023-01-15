import {AfterContentInit, Component, Inject, Injector, Input} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ModalReturnDeviceComponent} from "../modal-windows/modal-return-device/modal-return-device.component";
import {ModalCancelReserveComponent} from "../modal-windows/modal-cancel-reserve/modal-cancel-reserve.component";
import {ModalDeviceProblemComponent} from "../modal-windows/modal-device-problem/modal-device-problem.component";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-booked-device',
  templateUrl: './booked-device.component.html',
  styleUrls: ['./booked-device.component.scss']
})
export class BookedDeviceComponent implements AfterContentInit {
  API_URL = environment.API_URL
  @Input() imgUrl: string;
  @Input() deviceName: string;
  @Input() timeFrom: string;
  @Input() timeTo: string;
  @Input() date: string;
  @Input() idRecord: number;

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) {
  }

  dialogReturnDevice: Observable<number>
  dialogCancelReserve: Observable<number>
  dialogDeviceProblem: Observable<number>

  ngAfterContentInit() {
    this.dialogReturnDevice = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalReturnDeviceComponent, this.injector),
      {size: "auto", data: this.idRecord},
    );
    this.dialogCancelReserve = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalCancelReserveComponent, this.injector),
      {size: "auto", data: this.idRecord},
    );
    this.dialogDeviceProblem = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalDeviceProblemComponent, this.injector),
      {size: "auto"},
    );
  }


  showConfirmReturn(): void {
    this.dialogReturnDevice.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info(`Dialog closed`);
      },
    });
  }

  showConfirmCancel(): void {
    this.dialogCancelReserve.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info(`Dialog closed`);
      },
    });
  }

  showDeviceProblem(): void {
    this.dialogDeviceProblem.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info(`Dialog closed`);
      },
    });
  }

}

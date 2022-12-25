import {Component, ChangeDetectionStrategy, Inject, Injector, Input, AfterContentInit} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ModalDeviceCardComponent} from "../modal-windows/modal-device-card/modal-device-card.component";
import {ListDevicesPageComponent} from "../../pages/list-devices-page/list-devices-page.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements AfterContentInit{
  @Input() imgUrl: string;
  @Input() deviceName: string;
  @Input() os: string;
  @Input() diagonal: number;
  @Input() department: string;
  @Input() id: number;

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector,
              private listDevicesPage: ListDevicesPageComponent
  ) { }

  dialogDeviceCard: Observable<number>
  ngAfterContentInit() {
    this.dialogDeviceCard = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalDeviceCardComponent, this.injector),
      {
        data: this.id,
        size: "auto"
      }
    );
  }

  showDeviceCard(): void {
    this.dialogDeviceCard.subscribe();
  }
}

import {Component, Inject, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-modal-cancel-reserve',
  templateUrl: './modal-cancel-reserve.component.html',
  styleUrls: ['./modal-cancel-reserve.component.scss']
})
export class ModalCancelReserveComponent {
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService) {
  }

  showCancelReserve(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {size: "auto"}).subscribe();
  }

  cancelBookedDevice() {
    this.deviceService.cancelBookedDeviceByRecordId(this.data).subscribe(()=>{
      location.reload()
    })
  }

  closeCanselReserve() {
    this.context.completeWith(1)
  }
}

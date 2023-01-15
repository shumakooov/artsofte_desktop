import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-modal-return-device',
  templateUrl: './modal-return-device.component.html',
  styleUrls: ['./modal-return-device.component.scss']
})
export class ModalReturnDeviceComponent {
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService) {
  }

  showReturnDevice(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {size: "auto"}).subscribe();
  }

  closeReturnDevice() {
    this.context.completeWith(1)
  }

  handleDept(id: number) {
    this.deviceService.deptId.next(id);
  }

  doReturnDevice() {
    const returnDevice ={
      recordId: this.data,
      departmentId: this.deviceService.deptId.value
    }

    this.deviceService.returnDevice(returnDevice).subscribe()
  }

  reloadLocation(){
    location.reload()
  }
}

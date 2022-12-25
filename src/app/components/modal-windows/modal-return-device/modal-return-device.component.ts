import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";

@Component({
  selector: 'app-modal-return-device',
  templateUrl: './modal-return-device.component.html',
  styleUrls: ['./modal-return-device.component.scss']
})
export class ModalReturnDeviceComponent {
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>,) { }

  showReturnDevice(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {size: "auto"}).subscribe();
  }

}

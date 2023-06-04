import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {DeviceService} from "../../../services/device.service";
import {Report} from "../../../interfaces";

@Component({
  selector: 'app-modal-device-problem',
  templateUrl: './modal-device-problem.component.html',
  styleUrls: ['./modal-device-problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeviceProblemComponent implements OnInit{
  reportForm: FormGroup
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService) { }

  ngOnInit() {
    this.reportForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      reason: new FormControl(null, Validators.required),
    });
  }

  closeDeviceProblem() {
    this.context.completeWith(1)
  }

  postReport () {
    const report = {
      Reason: this.reportForm.value.reason,
      Description: this.reportForm.value.description
    }
    this.deviceService.postReport(report).subscribe(() => {location.reload()})
  }
}

import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDialogService} from "@taiga-ui/core";

@Component({
  selector: 'app-modal-device-problem',
  templateUrl: './modal-device-problem.component.html',
  styleUrls: ['./modal-device-problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeviceProblemComponent {
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService) { }

  testForm = new FormGroup({
    testValue2: new FormControl(`This one can be expanded`, Validators.required),
  });
}

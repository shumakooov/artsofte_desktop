import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";

@Component({
  selector: 'app-modal-device-problem',
  templateUrl: './modal-device-problem.component.html',
  styleUrls: ['./modal-device-problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeviceProblemComponent {
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>) { }

  testForm = new FormGroup({
    testValue2: new FormControl(`This one can be expanded`, Validators.required),
  });

  closeDeviceProblem() {
    this.context.completeWith(1)
  }
}

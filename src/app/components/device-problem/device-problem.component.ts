import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-device-problem',
  templateUrl: './device-problem.component.html',
  styleUrls: ['./device-problem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceProblemComponent implements OnInit {

  testForm = new FormGroup({
    testValue2: new FormControl(`This one can be expanded`, Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

}

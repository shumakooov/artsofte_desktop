import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dropdown-reason',
  templateUrl: './dropdown-reason.component.html',
  styleUrls: ['./dropdown-reason.component.scss'],
})
export class DropdownReasonComponent implements OnInit {
  open = false;

  onClick(): void {
    this.open = !this.open;
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

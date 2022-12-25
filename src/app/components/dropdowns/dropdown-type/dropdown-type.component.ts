import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-type',
  templateUrl: './dropdown-type.component.html',
  styleUrls: ['./dropdown-type.component.scss']
})
export class DropdownTypeComponent implements OnInit {
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

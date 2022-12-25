import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-department',
  templateUrl: './dropdown-department.component.html',
  styleUrls: ['./dropdown-department.component.scss']
})
export class DropdownDepartmentComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-system',
  templateUrl: './dropdown-system.component.html',
  styleUrls: ['./dropdown-system.component.scss']
})
export class DropdownSystemComponent implements OnInit {

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

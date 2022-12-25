import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-sort',
  templateUrl: './dropdown-sort.component.html',
  styleUrls: ['./dropdown-sort.component.scss']
})
export class DropdownSortComponent implements OnInit {
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

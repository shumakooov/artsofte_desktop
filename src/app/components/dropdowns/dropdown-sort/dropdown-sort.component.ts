import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dropdown-sort',
  templateUrl: './dropdown-sort.component.html',
  styleUrls: ['./dropdown-sort.component.scss']
})
export class DropdownSortComponent {
  items = [
    `Luke Skywalker`,
    `Leia Organa Solo`,
    `Darth Vader`,
    `Han Solo`,
    `Obi-Wan Kenobi`,
    `Yoda`,
  ];

  value = new FormControl();
}

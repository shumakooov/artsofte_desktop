import { Component, OnInit } from '@angular/core';
import {TUI_ARROW} from "@taiga-ui/kit";

@Component({
  selector: 'app-dropdown-tag',
  templateUrl: './dropdown-tag.component.html',
  styleUrls: ['./dropdown-tag.component.scss']
})
export class DropdownTagComponent implements OnInit {
  value = [];

  readonly tags = [`Tag1`, `Tag2`, `Tag3`, `Tag4`, `Tag5`, `Tag6`];

  readonly arrow = TUI_ARROW;

  constructor() { }

  ngOnInit(): void {
  }

}

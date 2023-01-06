import { Component, OnInit } from '@angular/core';
import {TUI_ARROW} from "@taiga-ui/kit";
import {EMPTY_ARRAY, TuiStringHandler} from "@taiga-ui/cdk";
import {TuiValueContentContext} from "@taiga-ui/core";

@Component({
  selector: 'app-dropdown-tag',
  templateUrl: './dropdown-tag.component.html',
  styleUrls: ['./dropdown-tag.component.scss']
})
export class DropdownTagComponent implements OnInit {

  value = EMPTY_ARRAY;


  readonly content: TuiStringHandler<TuiValueContentContext<readonly unknown[]>> = ({
                                                                                        $implicit: {length},
                                                                                    }) => (length ? `${length} tags` : `Выберите теги`);

  readonly tags = [`Tag1`, `Tag2`, `Tag3`, `Tag4`, `Tag5`, `Tag6`];

  readonly arrow = TUI_ARROW;

  constructor() { }

  ngOnInit(): void {
  }

}

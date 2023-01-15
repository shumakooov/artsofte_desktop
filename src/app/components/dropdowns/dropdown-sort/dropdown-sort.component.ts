import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";

@Component({
  selector: 'app-dropdown-sort',
  templateUrl: './dropdown-sort.component.html',
  styleUrls: ['./dropdown-sort.component.scss']
})
export class DropdownSortComponent {
  @Output() onClick = new EventEmitter()

  sorts = [
    { id: "name", name: "По названию" },
    { id: "namereverse", name: "По названию (в обратном порядке)" },
    { id: "diagonalmin", name: "По диагонали (по убыванию)" },
    { id: "diagonalmax", name: "По диагонали (по возрастанию)" },
    { id: "datenew", name: "По дате (сначала новые)" },
    { id: "dateold", name: "По дате (сначала старые)" },
  ]

  value = new FormControl();

  @tuiPure
  stringify(
    items: readonly { id: string; name: string }[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [string, string]));

    return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }
}

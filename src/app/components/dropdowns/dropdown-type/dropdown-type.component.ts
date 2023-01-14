import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";

@Component({
  selector: 'app-dropdown-type',
  templateUrl: './dropdown-type.component.html',
  styleUrls: ['./dropdown-type.component.scss']
})
export class DropdownTypeComponent implements OnInit {
  @Output() onClick = new EventEmitter()
  value: null;
  types: [{ id: number | null; name: string }]

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.types = filters.types
      this.types.push({id: null, name: "Нет"})
    })
  }

  @tuiPure
  stringify(
    items: readonly [{ id: number | null; name: string }],
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));

    return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || ``;
  }
}

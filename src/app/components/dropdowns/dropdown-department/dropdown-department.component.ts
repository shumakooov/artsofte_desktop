import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";

@Component({
  selector: 'app-dropdown-department',
  templateUrl: './dropdown-department.component.html',
  styleUrls: ['./dropdown-department.component.scss']
})
export class DropdownDepartmentComponent implements OnInit {
  @Output() onClick = new EventEmitter()
  value: null;
  depts: [{ id: number | null; name: string }]

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.depts = filters.departments
      this.depts.push({id: null, name: "Нет"})
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

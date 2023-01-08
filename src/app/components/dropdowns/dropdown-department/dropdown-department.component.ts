import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-dropdown-department',
  templateUrl: './dropdown-department.component.html',
  styleUrls: ['./dropdown-department.component.scss']
})
export class DropdownDepartmentComponent implements OnInit {

  value: number;

  depts: [{ id: number; name: string }]

  constructor(private filterService: FilterService,
              private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.depts = filters.departments
    })
  }

  @tuiPure
  stringify(
    items: readonly [{ id: number; name: string }],
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));

    return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || ``;
  }
}

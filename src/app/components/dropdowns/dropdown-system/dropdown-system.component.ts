import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FilterService} from "../../../services/filter.service";
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";

@Component({
  selector: 'app-dropdown-system',
  templateUrl: './dropdown-system.component.html',
  styleUrls: ['./dropdown-system.component.scss']
})
export class DropdownSystemComponent implements OnInit {
  @Output() onClick = new EventEmitter()
  value: null;
  systems: [{ id: number | null; name: string }]
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.systems = filters.systems
      this.systems.push({id: null, name: "Нет"})
    })
  }

  @tuiPure
  stringify(
    items: readonly [{ id: number | null; name: string }],
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [number | null, string]));

    return ({$implicit}: TuiContextWithImplicit<number | null>) => map.get($implicit) || ``;
  }
}

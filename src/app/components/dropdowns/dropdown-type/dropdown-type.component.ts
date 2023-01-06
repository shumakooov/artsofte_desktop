import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {FilterService} from "../../../services/filter.service";

@Component({
  selector: 'app-dropdown-type',
  templateUrl: './dropdown-type.component.html',
  styleUrls: ['./dropdown-type.component.scss']
})
export class DropdownTypeComponent implements OnInit {
  filters: string[]

  value = new FormControl();

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.filters = filters.types.map(function (el, idx, array) {
        return el.name
      })
    })
  }

}

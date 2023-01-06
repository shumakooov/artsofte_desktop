import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FilterService} from "../../../services/filter.service";

@Component({
  selector: 'app-dropdown-system',
  templateUrl: './dropdown-system.component.html',
  styleUrls: ['./dropdown-system.component.scss']
})
export class DropdownSystemComponent implements OnInit {
  value = new FormControl();
  filters: string[]

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.filters = filters.systems.map(function (el, idx, array) {
        return el.name
      })
    })
  }

}

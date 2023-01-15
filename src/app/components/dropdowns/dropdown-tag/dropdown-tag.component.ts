import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  TuiContextWithImplicit,
  TuiHandler,
  tuiIsNumber,
} from '@taiga-ui/cdk';
import {Observable, Subject, timer} from 'rxjs';
import {map, mapTo, shareReplay, startWith, switchMap} from 'rxjs/operators';
import {FilterService} from "../../../services/filter.service";

const DICTIONARY = [
  {id: 1, name: `Tag1`},
  {id: 2, name: `Tag2`},
  {id: 3, name: `Tag3`},
  {id: 4, name: `Tag4`},
  {id: 5, name: `Tag5`},
  {id: 6, name: `Tag6`},
];

@Component({
  selector: 'app-dropdown-tag',
  templateUrl: './dropdown-tag.component.html',
  styleUrls: ['./dropdown-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownTagComponent {

  readonly control = new FormControl();

  tags: string[]
  constructor(private filterService: FilterService) { }
  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.tags = filters.tags.map(value => {return value.name})
    })
  }

}

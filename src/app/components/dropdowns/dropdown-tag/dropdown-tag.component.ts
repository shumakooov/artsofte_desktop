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

  private readonly search$ = new Subject<string>();

  private readonly server$ = timer(1000).pipe(
    mapTo(DICTIONARY),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  // Items only hold IDs
  readonly items$ = this.search$.pipe(
    startWith(``),
    switchMap(search =>
      this.server$.pipe(
        map(items =>
          items
            .filter(({name}) => TUI_DEFAULT_MATCHER(name, search))
            .map(({id}) => id),
        ),
      ),
    ),
    startWith(null), // <-- loading
  );

  // Stringify mapper that turns IDs to names
  readonly stringify$: Observable<
    TuiHandler<TuiContextWithImplicit<number> | number, string>
  > = this.server$.pipe(
    map(items => new Map(items.map<[number, string]>(({id, name}) => [id, name]))),
    startWith(new Map()),
    map(
      map => (id: TuiContextWithImplicit<number> | number) =>
        (tuiIsNumber(id) ? map.get(id) : map.get(id.$implicit)) || `Loading...`,
    ),
  );

  readonly control = new FormControl();

  onSearch(search: string | null): void {
    this.search$.next(search || ``);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

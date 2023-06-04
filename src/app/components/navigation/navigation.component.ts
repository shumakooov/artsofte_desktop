import {ChangeDetectionStrategy, Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {Observable} from "rxjs";
import {ModalFilterComponent} from "../modal-windows/modal-filter/modal-filter.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public searchTerm: string;

  // sidebar
  open = false;

  toggle(open: boolean): void {
    this.open = open;
  }


  onClick(){
    this.deviceService.search.next('')
  }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['/login']),
      error => {console.warn(error)}
    )
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.deviceService.search.next(this.searchTerm);
  }

  constructor(private deviceService: DeviceService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector,
              private router: Router,
              private auth: AuthService,) { }

  dialogFilter: Observable<number>
  ngOnInit(): void {
    this.dialogFilter = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalFilterComponent, this.injector),
      {
        size: "auto"
      }
    );
  }

  showFilter(): void {
    this.dialogFilter.subscribe();
  }
}

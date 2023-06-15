import { Component, OnInit } from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ModalDeviceCardComponent} from "../modal-device-card/modal-device-card.component";

@Component({
  selector: 'app-routable-dialog',
  templateUrl: './routable-dialog.component.html',
  styleUrls: ['./routable-dialog.component.scss']
})
export class RoutableDialogComponent {
  constructor(
    tuiDialogService: TuiDialogService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    tuiDialogService.open(
      new PolymorpheusComponent(route.snapshot.data['dialog'])
    ).subscribe({complete: () => this.navigateToParent()});
  }

  private navigateToParent(): void {
    this.router.navigate([this.route.snapshot.data['backUrl']], {
      relativeTo: this.route
    });
  }
}

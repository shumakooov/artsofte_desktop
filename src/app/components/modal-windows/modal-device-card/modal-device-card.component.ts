import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector, OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiDay} from "@taiga-ui/cdk";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ModalBookingCardComponent} from "../modal-booking-card/modal-booking-card.component";
import {Observable, Subscription} from "rxjs";
import {Device, RecordsHistory, Tag} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modal-device-card',
  templateUrl: './modal-device-card.component.html',
  styleUrls: ['./modal-device-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeviceCardComponent implements OnInit, AfterContentInit {
  API_URL = environment.API_URL
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
              @Inject(Injector) private readonly injector: Injector,
              private deviceService: DeviceService,
              private router : Router,
              private route: ActivatedRoute) { }

  showUsageHistory(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {dismissible: true, size: "auto"}).subscribe();
  }

  dialogBookingCard: Observable<number>
  ngAfterContentInit() {
  this.dialogBookingCard = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalBookingCardComponent, this.injector),
      {
        data: this.id,
        size: "auto"
      }
    );
  }

  showBookingCard(): void {
    this.dialogBookingCard.subscribe();
  }

  device$: Observable<Device>
  usageHistory$: Observable<RecordsHistory[]>
  tags = ['#']
  id: number

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.id = params['id'];
        }
      );

    this.deviceService.getDeviceTags(this.id).subscribe(x => x.forEach(tag => this.tags.push(tag.name)))
    this.device$ = this.deviceService.getDevicesFullById(this.id)
    this.usageHistory$ = this.deviceService.getUsageHistoryById(this.id)
  }

  readonly control = new FormControl([]);
}

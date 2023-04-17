import {AfterContentInit, Component, Inject, Injector, OnInit, TemplateRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiDay} from "@taiga-ui/cdk";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ModalBookingCardComponent} from "../modal-booking-card/modal-booking-card.component";
import {Observable} from "rxjs";
import {Device, RecordsHistory} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-modal-device-card',
  templateUrl: './modal-device-card.component.html',
  styleUrls: ['./modal-device-card.component.scss']
})
export class ModalDeviceCardComponent implements OnInit, AfterContentInit{
  API_URL = environment.API_URL
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
              @Inject(Injector) private readonly injector: Injector,
              private deviceService: DeviceService) { }

  showUsageHistory(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {dismissible: true, size: "auto"}).subscribe();
  }

  dialogBookingCard: Observable<number>
  ngAfterContentInit() {
  this.dialogBookingCard = this.dialogService.open<number>(
      new PolymorpheusComponent(ModalBookingCardComponent, this.injector),
      {
        data: this.data,
        size: "auto"
      }
    );
  }

  showBookingCard(): void {
    this.dialogBookingCard.subscribe();
  }

  device$: Observable<Device>
  usageHistory$: Observable<RecordsHistory[]>

  ngOnInit(): void {
    this.device$ = this.deviceService.getDevicesShortById(this.data)
    this.usageHistory$ = this.deviceService.getUsageHistoryById(this.data)
  }

  valueCalendar: TuiDay | null = null;

  onDayClick(day: TuiDay): void {
    this.valueCalendar = day;
  }

  valueTag = [`Android`, `6,67"`, `MIUI`, `MI Браузер`];
  readonly control = new FormControl([]);
}

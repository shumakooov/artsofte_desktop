import {AfterContentInit, Component, Inject, Injector, OnInit, TemplateRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiDay} from "@taiga-ui/cdk";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ModalBookingCardComponent} from "../modal-booking-card/modal-booking-card.component";
import {Observable} from "rxjs";
import {Device} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";

@Component({
  selector: 'app-modal-device-card',
  templateUrl: './modal-device-card.component.html',
  styleUrls: ['./modal-device-card.component.scss']
})
export class ModalDeviceCardComponent implements OnInit, AfterContentInit{
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

  ngOnInit(): void {
    this.device$ = this.deviceService.getDevicesShortById(this.data)
  }

  valueCalendar: TuiDay | null = null;

  onDayClick(day: TuiDay): void {
    this.valueCalendar = day;
  }

  valueTag = [`Xiaomi`, `Android`, `6,67"`, `MIUI`];
  readonly control = new FormControl([]);
}

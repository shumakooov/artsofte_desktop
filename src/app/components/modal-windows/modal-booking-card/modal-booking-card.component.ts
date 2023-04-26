import {ChangeDetectionStrategy, Component, Inject, Injector, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDay} from "@taiga-ui/cdk";
import {tuiCreateTimePeriods} from "@taiga-ui/kit";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {Observable} from "rxjs";
import {Device} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ModalCalendarComponent} from "../modal-calendar/modal-calendar.component";

@Component({
  selector: 'app-modal-booking-card',
  templateUrl: './modal-booking-card.component.html',
  styleUrls: ['./modal-booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBookingCardComponent implements OnInit{
  API_URL = environment.API_URL

  mediaQuery: any = window.matchMedia("(max-width:480px)")

  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector,
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService,
              private router: Router,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService) { }

  device$: Observable<Device>
  timeStartForm: FormGroup
  timeFinishForm: FormGroup
  dialogCalendar: Observable<number>

  ngOnInit(): void {
    if (this.mediaQuery.matches) {
      this.dialogCalendar = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalCalendarComponent, this.injector),
        {
          size: "fullscreen"
        }
      );
    } else {
      this.dialogCalendar = this.dialogService.open<number>(
        new PolymorpheusComponent(ModalCalendarComponent, this.injector),
        {
          size: "auto"
        }
      );
    }

    this.device$ = this.deviceService.getDevicesShortById(this.data)

    this.timeStartForm = new FormGroup({
      timeStart: new FormControl(null, [Validators.required])
    })
    this.timeFinishForm = new FormGroup({
      timeFinish: new FormControl(null, [Validators.required])
    })
  }

  showCalendar(): void {
    this.dialogCalendar.subscribe();
  }

  items1 = tuiCreateTimePeriods();

  valueCalendar: string | null = null;
  valueCalendarTuiDay: TuiDay | null = null;

  onDayClick(day: TuiDay): void {
    this.valueCalendar = [day.year, day.formattedMonthPart, day.formattedDayPart].join('-');
    this.valueCalendarTuiDay = day;
  }

  recordDevice(){
    const record = {
      deviceid: this.data,
      date: this.valueCalendar + 'T' + this.timeStartForm.value.timeStart.toString() + ':00',
      timefrom: this.valueCalendar + 'T' + this.timeStartForm.value.timeStart.toString() + ':00',
      timeto: this.valueCalendar + 'T' + this.timeFinishForm.value.timeFinish.toString() + ':00'
    }
    this.deviceService.doRecordDevice(record).subscribe(()=>{
      location.reload()},
      error => {
        this.alertService.open(error.error.message).subscribe();
      }
      )
  }

  valueTag = [`Xiaomi`, `Android`, `6,67"`, `MIUI`];
  readonly control = new FormControl([]);

}

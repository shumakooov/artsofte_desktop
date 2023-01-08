import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TUI_DATE_FORMAT, TuiDay, TuiTime, TuiTimeMode} from "@taiga-ui/cdk";
import {tuiCreateTimePeriods, tuiInputTimeOptionsProvider} from "@taiga-ui/kit";
import {TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {Observable} from "rxjs";
import {Device, Record} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-booking-card',
  templateUrl: './modal-booking-card.component.html',
  styleUrls: ['./modal-booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBookingCardComponent implements OnInit{
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService,
              private router: Router,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService) { }

  device$: Observable<Device>
  timeStartForm: FormGroup
  timeFinishForm: FormGroup

  ngOnInit(): void {
    this.device$ = this.deviceService.getDevicesShortById(this.data)

    this.timeStartForm = new FormGroup({
      timeStart: new FormControl(null, [Validators.required])
    })
    this.timeFinishForm = new FormGroup({
      timeFinish: new FormControl(null, [Validators.required])
    })
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

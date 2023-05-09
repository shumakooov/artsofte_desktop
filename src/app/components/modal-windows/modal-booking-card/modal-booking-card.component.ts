import {ChangeDetectionStrategy, Component, Inject, Injector, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TUI_DATE_FORMAT, tuiControlValue, TuiDay, TuiMonth, TuiTime, TuiTimeMode, TuiYear} from "@taiga-ui/cdk";
import {TUI_CALENDAR_DATE_STREAM, tuiCreateTimePeriods, tuiInputTimeOptionsProvider} from "@taiga-ui/kit";
import {TUI_MONTHS, TuiAlertService, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {Observable, withLatestFrom} from "rxjs";
import {Device, Record} from "../../../interfaces";
import {DeviceService} from "../../../services/device.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ModalCalendarComponent} from "../modal-calendar/modal-calendar.component";
import {TuiMobileCalendarDialogComponent} from "@taiga-ui/addon-mobile";
import {map, startWith} from "rxjs/operators";

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
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
              @Inject(Injector) private readonly injector: Injector,
              private deviceService: DeviceService,
              private router: Router,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService,
              @Inject(TUI_MONTHS) private readonly months: Observable<string[]>,) {
    const dataStream = tuiControlValue(this.controlCal);
    const computedInjector = Injector.create({
      providers: [
        {
          provide: TUI_CALENDAR_DATE_STREAM,
          useValue: dataStream,
        },
      ],
      parent: injector,
    });
    const content = new PolymorpheusComponent(
      TuiMobileCalendarDialogComponent,
      computedInjector,
    );

    this.dialog$ = dialogService.open(content, {
      size: 'fullscreen',
      closeable: false,
      data: {
        min: TuiDay.currentLocal(),
      },
    });
  }

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


//calendar
  valueCalendar: string | null = null;
  private readonly controlCal = new FormControl(TuiDay.fromLocalNativeDate(new Date()));
  private readonly dialog$: Observable<TuiDay>;
  readonly date$ = this.controlCal.valueChanges.pipe(
    startWith(this.controlCal.value),
    withLatestFrom(this.months),
    map(([value, months]) => this.getParsed(value, months)),
  );

  get empty(): boolean {
    return !this.controlCal.value;
  }

  getParsed(value: TuiDay | null, months: string[]): string {
    if (!value) {
      return 'Choose a date';
    }

    const {month, day, year} = value;

    this.valueCalendar = [value.year, value.formattedMonthPart, value.formattedDayPart].join('-');
    return `${months[month]} ${day}, ${year}`;
  }

  onClick(): void {
    this.dialog$.subscribe(value => {
      this.controlCal.setValue(value);
    });
  }
//


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

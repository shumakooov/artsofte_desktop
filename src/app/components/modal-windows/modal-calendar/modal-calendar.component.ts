import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {CalendarRecord} from "../../../interfaces";
import {Location} from "@angular/common";
import {CalendarService} from "../../../services/calendar.service";
import {map} from "rxjs/operators";

const colors: Record<string, EventColor> = {
  gray: {
    primary: 'rgb(25,52,70)',
    secondary: 'rgba(100,117,135,0.7)',
    secondaryText: 'rgb(25,52,70)'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
};

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCalendarComponent {
  get data(): number {
    return this.context.data;
  }

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  locale: string = 'en';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  firstDate = new Date()
  lastDate = new Date()

  first = this.viewDate.getDate() - this.viewDate.getDay() + 1;
  last = this.first + 6;
  timeIntervalId = {
    start: new Date(this.firstDate.setDate(this.first)).toISOString(),
    end: new Date(this.lastDate.setDate(this.last)).toISOString(),
    deviceId: this.data
  };

  events$: Observable<CalendarEvent<CalendarRecord>[]>

  constructor(private location: Location,
              private calendarService: CalendarService,
              @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,) {
  }

  ngOnInit() {
    this.getEvents("today")
  }
  firstDay = this.first
  lastDay = this.last
  getEvents(offset: string) {
    switch (offset) {
      case "today":
        this.firstDay = this.first
        this.lastDay = this.last
        this.firstDate = new Date()
        this.lastDate = new Date()

        this.timeIntervalId = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString(),
          deviceId: this.data
        };
        break;
      case "previous":
        this.firstDay -= 7;
        this.lastDay -= 7;

        this.timeIntervalId = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString(),
          deviceId: this.data
        };
        break;
      case "next":
        this.firstDay += 7;
        this.lastDay += 7;

        this.timeIntervalId = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString(),
          deviceId: this.data
        };
        break;
    }
    this.events$ = this.calendarService.getEventsByDevice(this.timeIntervalId).pipe(
      map((events: CalendarRecord[]) => {
        return events.map((event: CalendarRecord) => {
          return {
            title: event.title,
            start: new Date(event.start.slice(0, -1)),
            end: new Date(event.end.slice(0, -1)),
            color: event.booked ? colors['blue'] : colors['gray'],
          };
        });
      })
    )
  }

  refresh = new Subject<void>();

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

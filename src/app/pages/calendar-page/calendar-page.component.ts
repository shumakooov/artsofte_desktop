import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {Location} from '@angular/common'
import {CalendarService} from "../../services/calendar.service";
import {map} from "rxjs/operators";
import {CalendarRecord, ChangeRecord} from "../../interfaces";
import { CustomDateFormatter } from './custom-date-formatter.provider';

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
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarPageComponent implements OnInit {
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
  timeInterval = {
    start: new Date(this.firstDate.setDate(this.first)).toISOString(),
    end: new Date(this.lastDate.setDate(this.last)).toISOString()
  };

  events$: Observable<CalendarEvent<CalendarRecord>[]>

  constructor(private location: Location,
              private calendarService: CalendarService) {
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

        this.timeInterval = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString()
        };
        break;
      case "previous":
        this.firstDay -= 7;
        this.lastDay -= 7;

        this.timeInterval = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString()
        };
        break;
      case "next":
        this.firstDay += 7;
        this.lastDay += 7;

        this.timeInterval = {
          start: new Date(this.firstDate.setDate(this.firstDay)).toISOString(),
          end: new Date(this.lastDate.setDate(this.lastDay)).toISOString()
        };
        break;
    }
    this.events$ = this.calendarService.getEventsByUser(this.timeInterval).pipe(
      map((events: CalendarRecord[]) => {
        return events.map((event: CalendarRecord) => {
          return {
            title: event.title,
            start: new Date(event.start.slice(0, -1)),
            end: new Date(event.end.slice(0, -1)),
            color: event.booked ? colors['blue'] : colors['gray'],
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            // actions: [
            //   {
            //     label: '<div>Удалить</div>',
            //     onClick: ({event}: { event: CalendarEvent<CalendarRecord> }): void => {
            //       this.events$ = this.events$.filter((iEvent) => iEvent !== event);
            //       console.log('Event deleted', event);
            //     },
            //   },
            // ],
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
    let changeRecord: ChangeRecord = {
      bookingId: event.id,
      start: newStart.toISOString(),
      end: newEnd?.toISOString()
    }
    this.calendarService.changeRecord(changeRecord)
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  goBack() {
    this.location.back();
  }
}

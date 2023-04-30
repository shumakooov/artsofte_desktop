import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCalendarComponent {
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  events: CalendarEvent[] = [
    {
      title: 'A non draggable event',
      color: colors['yellow'],
      start: new Date(2023, 3, 27, 12,0),
      end: new Date(2023, 3, 27, 14,0),
    },
    {
      title: 'A non draggable event',
      color: colors['blue'],
      start: new Date(2023, 3, 28, 15,0),
      end: new Date(2023, 3, 28, 19,0),
    },
  ];

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

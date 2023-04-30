import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Location } from '@angular/common'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {
  faTrash = faTrash
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  constructor(private location: Location) {
  }

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: colors['blue'],
      start: new Date(2023, 3, 27, 12,0),
      end: new Date(2023, 3, 27, 14,0),
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    },
    {
      title: 'Deletable event',
      color: colors['red'],
      start: new Date(2023, 3, 28, 12,0),
      end: new Date(2023, 3, 28, 14,0),
      actions: [
        {
        // <tui-svg src="tuiIconTrash"></tui-svg>
        // <fa-icon [icon]="faTrash"></fa-icon>
          label: '<div>Удалить</div>',
          onClick: ({event}: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log('Event deleted', event);
          },
        },
      ],
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

  goBack() {
    this.location.back();
  }
}

import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {CalendarRecord, ChangeRecord} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) {
  }

  getEventsByUser(timeInterval: {start: string, end: string}): Observable<CalendarRecord[]> {
    return this.http.post<CalendarRecord[]>(`${environment.API_URL}/api/records/calendar/user`,timeInterval, {withCredentials: true})
  }

  getEventsByDevice(timeIntervalId: {start: string, end: string, deviceId: number}): Observable<CalendarRecord[]> {
    return this.http.post<CalendarRecord[]>(`${environment.API_URL}/api/records/calendar/device`,timeIntervalId, {withCredentials: true})
  }

  changeRecord(changeRecord: ChangeRecord) {
    return this.http.post(`${environment.API_URL}/api/records/calendar/change`, changeRecord, {withCredentials: true})
  }
}

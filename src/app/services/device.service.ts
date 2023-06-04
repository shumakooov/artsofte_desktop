import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BookedDevice, Device, FilterSearch, Record, RecordsHistory, Report, ReturnDevice, Tag} from "../interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public search = new BehaviorSubject<string>("");
  public deptId = new BehaviorSubject<number>(Number(''))
  public systemId = new BehaviorSubject<number>(Number(''))
  public typeId = new BehaviorSubject<number>(Number(''))
  public sort = new BehaviorSubject<string>("")
  public diagonalRange = new BehaviorSubject<number[]>([])

  constructor(private http: HttpClient) {
  }

  getDevicesShort(): Observable<Device[]> {
    return this.http.get<Device[]>(`${environment.API_URL}/api/device/info/short`, {withCredentials: true})
  }

  getDevicesShortById(id: number): Observable<Device> {
    return this.http.get<Device>(`${environment.API_URL}/api/device/info/short/${id}`, {withCredentials: true})
  }

  getDevicesFullById(id: number): Observable<Device> {
    return this.http.get<Device>(`${environment.API_URL}/api/device/info/full/${id}`, {withCredentials: true})
  }

  doRecordDevice(record: Record) {
    return this.http.post(`${environment.API_URL}/api/records`, record, {withCredentials: true})
  }

  getBookedDevices() {
    return this.http.get<BookedDevice[]>(`${environment.API_URL}/api/records/user`, {withCredentials: true})
  }

  cancelBookedDeviceByRecordId(recordId: number) {
    return this.http.post(`${environment.API_URL}/api/records/cancel/${recordId}`, null, {withCredentials: true})
  }

  returnDevice(returnDevice: ReturnDevice) {
    return this.http.put(`${environment.API_URL}/api/records/pass`, returnDevice, {withCredentials: true})
  }

  getFilteredDevices(filter: FilterSearch): Observable<Device[]> {
    return this.http.post<Device[]>(`${environment.API_URL}/api/filter/search`, filter, {withCredentials: true})
  }

  getDeviceTags(deviceId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.API_URL}/api/tag/${deviceId}`, {withCredentials: true})
  }

  getUsageHistoryById(deviceId: number): Observable<RecordsHistory[]> {
    return this.http.get<RecordsHistory[]>(`${environment.API_URL}/api/records/history/${deviceId}`, {withCredentials: true})
  }

  postReport(report: Report) {
    return this.http.post(`${environment.API_URL}/api/report`, report, {withCredentials: true})
  }
}

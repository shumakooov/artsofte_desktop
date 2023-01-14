import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BookedDevice, Device, FilterSearch, Record, RecordsHistory} from "../interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public search = new BehaviorSubject<string>("");
  public deptId = new BehaviorSubject<number>(Number(''))
  public systemId = new BehaviorSubject<number>(Number(''))
  public typeId = new BehaviorSubject<number>(Number(''))
  public diagonalRange = new BehaviorSubject<number[]>([])

  constructor(private http: HttpClient) {
  }

  getDevicesShort(): Observable<Device[]>{
    return this.http.get<Device[]>(`${environment.API_URL}/device/info/short`, { withCredentials: true })
  }

  getDevicesShortById(id: number): Observable<Device>{
    return this.http.get<Device>(`${environment.API_URL}/device/info/short/${id}`, { withCredentials: true })
  }

  doRecordDevice(record: Record) {
    return this.http.post(`${environment.API_URL}/records`, record, { withCredentials: true })
  }

  getBookedDevices(){
    return this.http.get<BookedDevice[]>(`${environment.API_URL}/records/user`, { withCredentials: true })
  }

  cancelBookedDeviceByRecordId(recordId: number){
    return this.http.post(`${environment.API_URL}/records/cancel/${recordId}`, null ,{ withCredentials: true })
  }

  getFilteredDevices(filter: FilterSearch): Observable<Device[]>{
    return this.http.post<Device[]>(`${environment.API_URL}/filter/search`, filter, { withCredentials: true })
  }

  getUsageHistoryById(deviceId: number): Observable<RecordsHistory[]>{
    return this.http.get<RecordsHistory[]>(`${environment.API_URL}/records/history/${deviceId}`,{ withCredentials: true })
  }
}

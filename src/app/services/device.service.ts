import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BookedDevice, Device, Record} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
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
}

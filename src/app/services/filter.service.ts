import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Filter, Tag} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient) {
  }

  getFilters(): Observable<Filter> {
    return this.http.get<Filter>(`${environment.API_URL}/api/filter`, {withCredentials: true})
  }

  getTagsByDeviceId(deviceId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.API_URL}/api/tag/${deviceId}`, {withCredentials: true})
  }

  setTagToDevice(deviceId: number, name: string) {
    return this.http.put(`${environment.API_URL}/api/tag/${deviceId}/${name}`,null, {withCredentials: true})
  }

  deleteTagFromDevice(deviceId: number, tagId: number) {
    return this.http.delete(`${environment.API_URL}/api/tag/delete/${deviceId}/${tagId}`, {withCredentials: true})
  }
}

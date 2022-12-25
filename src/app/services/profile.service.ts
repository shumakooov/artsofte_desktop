import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BookedDevice, Profile, Record} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  editProfile(profile: Profile) {
    return this.http.put(`${environment.API_URL}/profile/update`, profile, {withCredentials: true})
  }

  getProfileInfo(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.API_URL}/profile`, {withCredentials: true})
  }

  getBookingHistory(): Observable<BookedDevice[]> {
    return this.http.get<BookedDevice[]>(`${environment.API_URL}/records/history/user`, { withCredentials: true })
  }
}

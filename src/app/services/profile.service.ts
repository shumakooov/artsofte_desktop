import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BookedDevice, Profile, Record} from "../interfaces";
import {Observable} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  editProfile(profile: Profile) {
    return this.http.put(`${environment.API_URL}/api/profile/update`, profile, {withCredentials: true})
  }

  getProfileInfo(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.API_URL}/api/profile`, {withCredentials: true})
  }

  getBookingHistory(): Observable<BookedDevice[]> {
    return this.http.get<BookedDevice[]>(`${environment.API_URL}/api/records/history/user`, {withCredentials: true})
  }

  setProfileImage(file: FormData) {
    return this.http.post(`${environment.API_URL}/api/image/user`, file,{withCredentials: true})
  }
}

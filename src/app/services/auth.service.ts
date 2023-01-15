import {Injectable} from "@angular/core";
import {Device, IsAuth, User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post<any>(`${environment.API_URL}/api/user/login`, user, { withCredentials: true })
  }

  logout() {
    return this.http.get<any>(`${environment.API_URL}/api/user/logout`, { withCredentials: true })
  }

  isAuthenticated(): Observable<IsAuth>{
    return this.http.get<IsAuth>(`${environment.API_URL}/api/user/authorize`, { withCredentials: true });
  }
}

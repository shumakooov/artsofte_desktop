import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Filter} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient) {
  }

  getFilters(): Observable<Filter> {
    return this.http.get<Filter>(`${environment.API_URL}/filter`, {withCredentials: true})
  }
}

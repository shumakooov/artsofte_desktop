import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Observable} from "rxjs";
import {BookedDevice, Record} from "../../interfaces";

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  bookingHistory$: Observable<BookedDevice[]>
  ngOnInit(): void {
    this.bookingHistory$ = this.profileService.getBookingHistory()
  }

}

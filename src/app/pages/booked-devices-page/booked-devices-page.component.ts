import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookedDevice, Device} from "../../interfaces";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-booked-devices-page',
  templateUrl: './booked-devices-page.component.html',
  styleUrls: ['./booked-devices-page.component.scss']
})
export class BookedDevicesPageComponent implements OnInit {
  searchKey: string = "";

  filtersticky:boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll(){
    if(window.scrollY > 50)
    {
      this.filtersticky = true;
    }
    else
    {
      this.filtersticky = false;
    }
  }

  bookedDevices$: Observable<BookedDevice[]>

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.bookedDevices$ = this.deviceService.getBookedDevices()

    this.deviceService.search.subscribe((value) => {
      this.searchKey = value;
    })
  }

}

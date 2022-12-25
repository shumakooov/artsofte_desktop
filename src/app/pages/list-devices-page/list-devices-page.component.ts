import {ChangeDetectionStrategy, Component, HostListener, OnInit, Output} from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {Device} from "../../interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-devices-page',
  templateUrl: './list-devices-page.component.html',
  styleUrls: ['./list-devices-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDevicesPageComponent implements OnInit {

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

  devices$: Observable<Device[]>

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.devices$ = this.deviceService.getDevicesShort()
  }
}

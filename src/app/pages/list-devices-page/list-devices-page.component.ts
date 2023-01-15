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
  searchKey: string = "";

  filtersticky: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 50) {
      this.filtersticky = true;
    } else {
      this.filtersticky = false;
    }
  }

  devices$: Observable<Device[]>

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.devices$ = this.deviceService.getDevicesShort()

    this.deviceService.search.subscribe((value) => {
      this.searchKey = value;
    })
  }

  public getFilteredDevices() {
    const filter = {
      type: this.deviceService.typeId.value === 0? null : this.deviceService.typeId.value,
      os: this.deviceService.systemId.value === 0? null : this.deviceService.systemId.value,
      department: this.deviceService.deptId.value === 0? null : this.deviceService.deptId.value,
      tags: null,
      minlen: this.deviceService.diagonalRange.value[0],
      maxlen: this.deviceService.diagonalRange.value[1],
      sortType: this.deviceService.sort.value === ""? null: this.deviceService.sort.value
    }
      this.devices$ = this.deviceService.getFilteredDevices(filter)
  }
}

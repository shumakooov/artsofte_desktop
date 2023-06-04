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
  mediaQuery: any = window.matchMedia("(max-width:767px)")

  searchKey: string = "";

  devices$: Observable<Device[]>

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    if (this.mediaQuery.matches) {
      let el = document.getElementById('filter');
      // @ts-ignore
      el.remove();
    }

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

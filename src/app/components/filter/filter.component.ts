import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDay, TuiDayRange} from "@taiga-ui/cdk";
import {DeviceService} from "../../services/device.service";
import {ListDevicesPageComponent} from "../../pages/list-devices-page/list-devices-page.component";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  constructor(private deviceService: DeviceService,
              private listDevicesComp: ListDevicesPageComponent,
              private filterService: FilterService) {
  }

  public searchTerm: string;

  //Теги
  value = [`Tag`, `Tag`, `Tag`, `Tag`, `Tag`];
  readonly controlTag = new FormControl([]);

  //Range, выбор диагонали
  max: number;
  readonly min = 0;
  rangeValue = [0, 0];
  readonly step = 0.1;

  //Календарь
  date = null;

  readonly minDate = new TuiDay(2000, 2, 20);
  readonly maxDate = new TuiDay(2040, 2, 20);

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.max = filters.maxLen
      this.rangeValue = [0, filters.maxLen]
      this.deviceService.diagonalRange.next(this.rangeValue)
    })
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.deviceService.search.next(this.searchTerm);
  }

  handleDept(id: number) {
    this.deviceService.deptId.next(id);
  }

  handleType(id: number) {
    this.deviceService.typeId.next(id);
  }

  handleSystem(id: number) {
    this.deviceService.systemId.next(id);
  }

  handleDiagonal(){
    this.deviceService.diagonalRange.next(this.rangeValue)
  }

  handleSort(sort: string){
    this.deviceService.sort.next(sort)
  }

  doSearch() {
    this.listDevicesComp.getFilteredDevices()
  }
}

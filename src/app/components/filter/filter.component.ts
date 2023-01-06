import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiDay, TuiDayRange} from "@taiga-ui/cdk";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  constructor(private deviceService: DeviceService) {
  }
  public searchTerm: string;

  //Теги
  value = [`Tag`, `Tag`, `Tag`, `Tag`, `Tag`];
  readonly controlTag = new FormControl([]);

  //Range, выбор диагонали
  rangeValue = [20, 30];
  readonly min = 0;
  readonly max = 50;
  readonly step = 0.5;

  //Календарь
  date = null;

  readonly minDate = new TuiDay(2000, 2, 20);
  readonly maxDate = new TuiDay(2040, 2, 20);

  ngOnInit(): void {
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.deviceService.search.next(this.searchTerm);
  }
}

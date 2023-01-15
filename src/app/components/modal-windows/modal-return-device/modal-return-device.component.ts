import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {DeviceService} from "../../../services/device.service";
import {FilterService} from "../../../services/filter.service";

@Component({
  selector: 'app-modal-return-device',
  templateUrl: './modal-return-device.component.html',
  styleUrls: ['./modal-return-device.component.scss']
})
export class ModalReturnDeviceComponent implements OnInit{
  get data(): number {
    return this.context.data;
  }

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<number, number>,
              private deviceService: DeviceService,
              private filterService: FilterService) {
  }

  depts: [{ id: number | null; name: string }]

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.depts = filters.departments
      this.depts.push({id: null, name: "Нет"})
    })
  }

  showReturnDevice(content: TemplateRef<TuiDialogContext<void>>): void {
    this.dialogService.open(content, {size: "auto"}).subscribe();
  }

  closeReturnDevice() {
    this.context.completeWith(1)
  }

  handleDept(id: number) {
    this.deviceService.deptId.next(id);
  }

  doReturnDevice() {
    const returnDevice ={
      recordId: this.data,
      departmentId: this.deviceService.deptId.value
    }

    this.deviceService.returnDevice(returnDevice).subscribe()
  }

  reloadLocation(){
    location.reload()
  }
}

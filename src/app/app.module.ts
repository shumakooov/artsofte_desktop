import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiDialogModule,
  TuiSvgModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule,
  TuiCalendarModule,
  TuiAlertModule
} from "@taiga-ui/core";
import {
  TuiInputModule,
  TuiInputDateRangeModule,
  TuiUnfinishedValidatorModule,
  TuiFieldErrorPipeModule,
  TuiTextAreaModule,
  TuiInputFilesModule,
  TuiInputTagModule,
  TuiRangeModule,
  TuiIslandModule,
  TuiTagModule,
  TuiMultiSelectModule,
  TuiInputTimeModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceComponent} from './components/device/device.component';
import {ListDevicesPageComponent} from './pages/list-devices-page/list-devices-page.component';
import {BookedDevicesPageComponent} from './pages/booked-devices-page/booked-devices-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FilterComponent} from './components/filter/filter.component';
import {BookedDeviceComponent} from './components/booked-device/booked-device.component';
import {DropdownSystemComponent} from './components/dropdowns/dropdown-system/dropdown-system.component';
import {DropdownTypeComponent} from './components/dropdowns/dropdown-type/dropdown-type.component';
import {DropdownDepartmentComponent} from './components/dropdowns/dropdown-department/dropdown-department.component';
import {DropdownSortComponent} from "./components/dropdowns/dropdown-sort/dropdown-sort.component";
import {ModalCancelReserveComponent} from './components/modal-windows/modal-cancel-reserve/modal-cancel-reserve.component';
import {ModalReturnDeviceComponent} from './components/modal-windows/modal-return-device/modal-return-device.component';
import {DeviceProblemComponent} from './components/device-problem/device-problem.component';
import {DropdownReasonComponent} from './components/dropdowns/dropdown-reason/dropdown-reason.component';
import {InputFilesComponent} from './components/input-files/input-files.component';
import {ModalDeviceCardComponent} from './components/modal-windows/modal-device-card/modal-device-card.component';
import {BookingHistoryComponent} from "./components/booking-history/booking-history.component";
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {DropdownTagComponent} from "./components/dropdowns/dropdown-tag/dropdown-tag.component";
import {ModalBookingCardComponent} from "./components/modal-windows/modal-booking-card/modal-booking-card.component";
import {ModalDeviceProblemComponent} from "./components/modal-windows/modal-device-problem/modal-device-problem.component";
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HttpClientModule} from "@angular/common/http";
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ListDevicesPageComponent,
    BookedDevicesPageComponent,
    ProfilePageComponent,
    NavigationComponent,
    FilterComponent,
    BookedDeviceComponent,
    DropdownSystemComponent,
    DropdownTypeComponent,
    DropdownDepartmentComponent,
    DropdownSortComponent,
    ModalCancelReserveComponent,
    ModalReturnDeviceComponent,
    DeviceProblemComponent,
    DropdownReasonComponent,
    InputFilesComponent,
    ModalDeviceCardComponent,
    BookingHistoryComponent,
    ProfileInfoComponent,
    DropdownTagComponent,
    ModalBookingCardComponent,
    ModalDeviceProblemComponent,
    LoginPageComponent,
    EditProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    FormsModule,
    TuiDataListModule,
    TuiActiveZoneModule,
    TuiDropdownModule,
    TuiInputDateRangeModule,
    TuiUnfinishedValidatorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiDialogModule,
    TuiSvgModule,
    TuiTextAreaModule,
    TuiInputFilesModule,
    TuiInputTagModule,
    TuiRangeModule,
    TuiIslandModule,
    TuiTagModule,
    TuiHostedDropdownModule,
    TuiMultiSelectModule,
    TuiScrollbarModule,
    TuiCalendarModule,
    TuiInputTimeModule,
    TuiInputPasswordModule,
    HttpClientModule,
    TuiAlertModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

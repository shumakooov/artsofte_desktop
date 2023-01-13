import {Component, HostListener, OnInit} from '@angular/core';
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navbarsticky:boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll(){
    if(window.scrollY > 50)
    {
      this.navbarsticky = true;
    }
    else
    {
      this.navbarsticky = false;
    }
  }

  onClick(){
    this.deviceService.search.next('')
  }

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}

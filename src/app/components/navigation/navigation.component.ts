import {Component, HostListener, OnInit} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}

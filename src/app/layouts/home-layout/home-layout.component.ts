import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

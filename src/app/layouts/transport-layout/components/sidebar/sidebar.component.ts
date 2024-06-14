import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Offres',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Demandes',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Store',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Reclamations',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Nous',  icon:'ni-key-25 text-info', class: '' },
];

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class NewSidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/co-transport/admin/', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/co-transport/admin/users', title: 'Users',  icon:'ni-planet text-blue', class: '' },
    { path: '/co-transport/admin/annonces', title: 'Annonces',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/co-transport/admin/reservations', title: 'Reservations',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/co-transport/admin/produits', title: 'Produits',  icon:'ni-shop shop', class: '' },
    { path: '/co-transport/admin/categories', title: 'Categories',  icon:'ni-tv-2 text-danger', class: '' },
    { path: '/co-transport/admin/reclamations', title: 'Reclamations',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/co-transport/admin/offre', title: 'Offres',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/co-transport/profile-page', title: 'My profile',  icon:'ni-key-25 text-info', class: '' },
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

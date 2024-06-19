import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (token && expiresIn) {
      const currentTime = new Date().getTime();
      const expiryTime = Number(expiresIn);

      if (currentTime < expiryTime) {
        return true;
      } else {
        // Token expired, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
      }
    }

    this.router.navigate(['/co-transport/login']).then();
    return false;
  }

}

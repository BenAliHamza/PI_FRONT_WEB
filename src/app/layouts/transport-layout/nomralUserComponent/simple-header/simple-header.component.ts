import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {UserService} from "../../../../services/user.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent {
  imageMale = "assets/img/male.png";
  imageFemale = "assets/img/female.png";
  @Input() user : User =null ;
  constructor(private auth: AuthService ) {
  }

  logout() {
    this.auth.logout();
    setTimeout(()=> {
      location.reload();
    }, 10)
  }
}

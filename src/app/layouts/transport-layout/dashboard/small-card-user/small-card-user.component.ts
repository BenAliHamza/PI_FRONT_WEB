import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {first} from "rxjs";

@Component({
  selector: 'app-small-card-user',
  templateUrl: './small-card-user.component.html',
  styleUrls: ['./small-card-user.component.scss']
})
export class SmallCardUserComponent implements OnInit {
  @Input()user :User ;
  constructor() { }

  ngOnInit(): void {
  }

  protected readonly first = first;
}

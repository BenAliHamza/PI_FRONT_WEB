import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accessoire } from '../../../../interfaces/accessoire';
import { AccessoireService } from '../../../../services/accessoire/accessoire.service';

@Component({
  selector: 'app-accessoire-details',
  templateUrl: './accessoire-details.component.html',
  styleUrls: ['./accessoire-details.component.css']
})
export class AccessoireDetailsComponent implements OnInit {
  accessory: Accessoire;

  constructor(private route: ActivatedRoute, private accessoireService: AccessoireService) { }

  ngOnInit(): void {
    this.getAccessoryDetails();
  }

  getAccessoryDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.accessoireService.getAccessoireById(id).subscribe(
      (accessory: Accessoire) => {
        this.accessory = accessory;
      },
      error => {
        console.error('Failed to fetch accessory details:', error);
      }
    );
  }
}

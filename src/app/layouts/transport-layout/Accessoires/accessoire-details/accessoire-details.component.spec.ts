import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoireDetailsComponent } from './accessoire-details.component';

describe('AccessoireDetailsComponent', () => {
  let component: AccessoireDetailsComponent;
  let fixture: ComponentFixture<AccessoireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoireDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

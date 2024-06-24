import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccessoireComponent } from './create-accessoire.component';

describe('CreateAccessoireComponent', () => {
  let component: CreateAccessoireComponent;
  let fixture: ComponentFixture<CreateAccessoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccessoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccessoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

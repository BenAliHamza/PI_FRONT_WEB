import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccessoireComponent } from './edit-accessoire.component';

describe('EditAccessoireComponent', () => {
  let component: EditAccessoireComponent;
  let fixture: ComponentFixture<EditAccessoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccessoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccessoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

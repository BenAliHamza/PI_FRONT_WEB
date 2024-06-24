import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccessoiresComponent } from './list-accessoires.component';

describe('ListAccessoiresComponent', () => {
  let component: ListAccessoiresComponent;
  let fixture: ComponentFixture<ListAccessoiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccessoiresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccessoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

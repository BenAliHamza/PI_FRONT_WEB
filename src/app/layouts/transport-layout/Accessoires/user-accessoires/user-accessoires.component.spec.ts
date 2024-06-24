import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessoiresComponent } from './user-accessoires.component';

describe('UserAccessoiresComponent', () => {
  let component: UserAccessoiresComponent;
  let fixture: ComponentFixture<UserAccessoiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoiresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccessoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

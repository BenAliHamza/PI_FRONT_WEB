import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorieFavorieComponent } from './edit-categorie-favorie.component';

describe('EditCategorieFavorieComponent', () => {
  let component: EditCategorieFavorieComponent;
  let fixture: ComponentFixture<EditCategorieFavorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategorieFavorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategorieFavorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorieFavorieComponent } from './create-categorie-favorie.component';

describe('CreateCategorieFavorieComponent', () => {
  let component: CreateCategorieFavorieComponent;
  let fixture: ComponentFixture<CreateCategorieFavorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategorieFavorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategorieFavorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

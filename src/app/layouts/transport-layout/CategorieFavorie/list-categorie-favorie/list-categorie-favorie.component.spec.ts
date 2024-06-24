import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorieFavorieComponent } from './list-categorie-favorie.component';

describe('ListCategorieFavorieComponent', () => {
  let component: ListCategorieFavorieComponent;
  let fixture: ComponentFixture<ListCategorieFavorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategorieFavorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategorieFavorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

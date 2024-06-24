import { TestBed } from '@angular/core/testing';

import { CategorieFavorieService } from './categorie-favorie.service';

describe('CategorieFavorieService', () => {
  let service: CategorieFavorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieFavorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

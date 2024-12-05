import { TestBed } from '@angular/core/testing';

import { ThemeLogicService } from './theme-logic.service';

describe('ThemeLogicService', () => {
  let service: ThemeLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

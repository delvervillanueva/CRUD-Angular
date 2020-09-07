import { TestBed } from '@angular/core/testing';

import { CucService } from './cuc.service';

describe('CucService', () => {
  let service: CucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

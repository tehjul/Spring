import { TestBed } from '@angular/core/testing';

import { CltFrsService } from './cltfrs.service';

describe('CltfrsService', () => {
  let service: CltFrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CltFrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

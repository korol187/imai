import { TestBed } from '@angular/core/testing';

import { HttpCustomService } from './http-custom.service';

describe('HttpServiceService', () => {
  let service: HttpCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

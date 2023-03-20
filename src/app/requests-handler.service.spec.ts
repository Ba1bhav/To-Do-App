import { TestBed } from '@angular/core/testing';

import { RequestsHandlerService } from './requests-handler.service';

describe('RequestsHandlerService', () => {
  let service: RequestsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

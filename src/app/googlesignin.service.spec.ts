import { TestBed } from '@angular/core/testing';

import { GooglesigninService } from './googlesignin.service';

describe('GooglesigninService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglesigninService = TestBed.get(GooglesigninService);
    expect(service).toBeTruthy();
  });
});

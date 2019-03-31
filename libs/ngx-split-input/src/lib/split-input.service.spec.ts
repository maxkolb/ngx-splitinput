import { TestBed } from '@angular/core/testing';

import { SplitInputService } from './split-input.service';

describe('SplitInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplitInputService = TestBed.get(SplitInputService);
    expect(service).toBeTruthy();
  });
});

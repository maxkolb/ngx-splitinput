import { TestBed } from '@angular/core/testing';

import { SplitInputEventHandlerService } from './split-input.service';

describe('SplitInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplitInputEventHandlerService = TestBed.get(SplitInputEventHandlerService);
    expect(service).toBeTruthy();
  });
});

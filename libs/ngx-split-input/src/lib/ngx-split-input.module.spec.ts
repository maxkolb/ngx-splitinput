import { async, TestBed } from '@angular/core/testing';
import { NgxSplitInputModule } from './ngx-split-input.module';

describe('NgxSplitInputModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSplitInputModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxSplitInputModule).toBeDefined();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSplitInputComponent } from './ngx-split-input.component';

describe('NgxSplitInputComponent', () => {
  let component: NgxSplitInputComponent;
  let fixture: ComponentFixture<NgxSplitInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSplitInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSplitInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

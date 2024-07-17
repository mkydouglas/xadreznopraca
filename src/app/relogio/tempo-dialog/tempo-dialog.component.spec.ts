import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoDialogComponent } from './tempo-dialog.component';

describe('TempoDialogComponent', () => {
  let component: TempoDialogComponent;
  let fixture: ComponentFixture<TempoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempoDialogComponent]
    });
    fixture = TestBed.createComponent(TempoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

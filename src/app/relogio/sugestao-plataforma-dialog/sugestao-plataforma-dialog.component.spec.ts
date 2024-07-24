import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestaoPlataformaDialogComponent } from './sugestao-plataforma-dialog.component';

describe('SugestaoPlataformaDialogComponent', () => {
  let component: SugestaoPlataformaDialogComponent;
  let fixture: ComponentFixture<SugestaoPlataformaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugestaoPlataformaDialogComponent]
    });
    fixture = TestBed.createComponent(SugestaoPlataformaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

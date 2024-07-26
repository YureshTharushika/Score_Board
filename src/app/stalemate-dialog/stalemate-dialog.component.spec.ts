import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StalemateDialogComponent } from './stalemate-dialog.component';

describe('StalemateDialogComponent', () => {
  let component: StalemateDialogComponent;
  let fixture: ComponentFixture<StalemateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StalemateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StalemateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreInputComponent } from './input.component';

describe('SioCoreInputComponent', () => {
  let component: SioCoreInputComponent;
  let fixture: ComponentFixture<SioCoreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SioCoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

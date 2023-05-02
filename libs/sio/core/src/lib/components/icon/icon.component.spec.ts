import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SioCoreIconComponent } from './icon.component';

describe('SioCoreCardComponent', () => {
  let component: SioCoreIconComponent;
  let fixture: ComponentFixture<SioCoreIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SioCoreIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SioCoreIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
